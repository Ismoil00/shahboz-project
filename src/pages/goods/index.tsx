import { useState } from "react";
import Header from "../../components/header";
import SearchBar from "../../components/searchBar";
import Spinner from "../../components/spinner";
import customServerRequest from "../../components/customFetch";
import Notify from "../../components/toast";
import type { ProductProps } from "../../components/types";
import Button from "../../components/button";

const Goods = () => {
  const [searchedText, setSearchedText] = useState("");
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([
    {
      id: 134343434,
      code: 10000,
      name: "Блокнот А5",
      description: "Качественный канцелярский товар.",
      price: 454.68,
      in_stock: 8,
      active: true,
    },
    {
      id: 2234234234,
      code: 10000,
      name: "Блокнот А5",
      description: "Качественный канцелярский товар.",
      price: 454.68,
      in_stock: 8,
      active: true,
    },
  ]);
  const [chosenProducts, setChosenProducts] = useState<number[]>([]);

  // console.log("searchedText", searchedText);

  /* finding searched term */
  const handleSearch = async () => {
    try {
      setLoader(true);

      /* SERVER REQUEST */
      const response = await customServerRequest(`products/${searchedText}`);

      /* HTTP ERROR HANDLE */
      if (response.status !== 200) throw response;

      const data = await response.json();

      setProducts((p) => [...p, { ...data }]);

      /* SUCCESS */
      Notify("Поиск Данных Успешно Сделано", "success");
    } catch (error: any) {
      const errMsg: string =
        error?.statusText === "Not Found" && error?.status === 404
          ? "Запись не найдена"
          : "SEARCHED PRODUCTS FETCH ERROR";
      Notify(errMsg, "error");
      console.error("SEARCHED PRODUCTS FETCH ERROR: ", error);
    } finally {
      setLoader(false);
    }
  };

  /* Enter press */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div>
      {loader ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <h1 className="text-3xl font-bold text-default-text pt-10 pl-10">
            Продукты
          </h1>
          <div className="mt-4 ml-10 mr-20">
            <SearchBar
              searchedText={searchedText}
              setSearchedText={setSearchedText}
              handleSearch={handleSearch}
              placeholder="Ищите Товар (можете нажать ENTER для поиска)"
              onKeyDown={handleKeyDown}
            />
          </div>

          <article className="flex gap-x-10 gap-y-10 flex-wrap p-10">
            {products.map((product: ProductProps) => (
              <ProductComponent
                key={product.id}
                product={product}
                isChosen={chosenProducts.includes(product.id)}
                setChosenProducts={setChosenProducts}
              />
            ))}
          </article>
        </>
      )}
    </div>
  );
};

export default Goods;

interface ProductComponentProps {
  product: ProductProps;
  isChosen: boolean;
  setChosenProducts: React.Dispatch<React.SetStateAction<number[]>>;
}

const ProductComponent = ({
  product,
  isChosen,
  setChosenProducts,
}: ProductComponentProps) => {
  return (
    <section className="w-80 h-fit flex flex-col bg-gray-bg rounded-2xl shadow-lg relative z-0">
      {isChosen && (
        <div
          className={`cover absolute top-0 bottom-0 right-0 left-0 bg-white opacity-70 rounded-2xl z-10`}
        ></div>
      )}
      <img
        src="public/product-icon.png"
        alt="product image"
        className="w-full object-cover rounded-t-2xl"
      />
      <div className="texts pl-3 py-3 flex flex-col gap-2 text-default-text">
        <p>
          <span className="text-default-text/70">Цена:</span>{" "}
          <span className="text-secondary font-medium">{product.price} c.</span>
        </p>
        <p>
          <span className="text-default-text/70">Код товара:</span>{" "}
          <span className="text-secondary font-medium">{product.code}</span>
        </p>
        <p>
          <span className="text-default-text/70">Название:</span> {product.name}
        </p>
        <p>
          <span className="text-default-text/70">Описание:</span>{" "}
          {product.description}
        </p>
        <p>
          <span className="text-default-text/70">Доступное количество:</span>{" "}
          <span className="text-secondary font-medium">{product.in_stock}</span>
        </p>
      </div>
      <Button
        text={`${isChosen ? "Убрать" : "Добавить"}`}
        onClick={() =>
          setChosenProducts((p: number[]) => {
            const next = new Set(p);
            if (next.has(product.id)) next.delete(product.id);
            else next.add(product.id);
            return Array.from(next);
          })
        }
        tailwindUtilities="rounded-2xl! bg-secondary! hover:bg-secondary/70! duration-200 transition cursor-pointer z-20!"
      />
    </section>
  );
};
