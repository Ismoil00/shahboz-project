import { useState } from "react";
import Header from "../../components/header";
import SearchBar from "../../components/searchBar";
import Spinner from "../../components/spinner";
import customServerRequest from "../../components/customFetch";
import Notify from "../../components/toast";
import type {
  ProductProps,
  PurchaseProductProps,
} from "../../components/types";
import MoreDetailsModal from "./moreDetailsModal";
import ProductComponent from "./productComponent";
import { MdPayment } from "react-icons/md";
import { MdOutlineCleaningServices } from "react-icons/md";
import ChosenProductsModal from "./chosenProductsModal";

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
      code: 2233,
      name: "iPhone 13 Pro Max",
      description:
        "this is new iPhone that has recently released and has the best features that none other has besides it.",
      price: 1200,
      in_stock: 80,
      active: true,
    },
  ]);
  /* chosen products to buy states */
  const [chosenProducts, setChosenProducts] = useState<PurchaseProductProps[]>(
    []
  );
  const [chosenProductsModal, setChosenProductsModal] = useState(false);
  /* a product in more details */
  const [moreDetailsModal, setMoreDetailsModal] = useState(false);
  const [moreDetailsProduct, setMoreDetailsProduct] = useState<ProductProps>(
    {} as ProductProps
  );

  // console.log("chosenproducts", chosenProducts);

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

  /* remove all */
  const cleanChosenProducts = () => setChosenProducts([]);

  return (
    <div className="relative">
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
                isChosen={chosenProducts.some(
                  (el: ProductProps) => el.id === product.id
                )}
                setChosenProducts={setChosenProducts}
                setMoreDetailsModal={setMoreDetailsModal}
                setMoreDetailsProduct={setMoreDetailsProduct}
              />
            ))}
          </article>

          {chosenProducts.length > 0 && (
            <article className="w-full fixed bottom-[100px] flex gap-5 items-center justify-center">
              <button
                className="bg-secondary text-white rounded-xl shadow-xl shadow-black/50 w-[140px] h-fit py-2 cursor-pointer hover:bg-secondary/75 duration-200 transition my-auto flex gap-2 justify-center items-center"
                onClick={cleanChosenProducts}
              >
                <MdOutlineCleaningServices size={25} /> Очистить
              </button>
              <button
                className="bg-primary text-white rounded-xl shadow-xl shadow-black/50 w-[140px] h-fit py-2 cursor-pointer hover:bg-hover-text duration-200 transition my-auto flex gap-2 justify-center items-center"
                onClick={() => setChosenProductsModal(true)}
              >
                <MdPayment size={25} /> Покупать
              </button>
            </article>
          )}

          {chosenProductsModal && (
            <ChosenProductsModal
              chosenProducts={chosenProducts}
              setChosenProducts={setChosenProducts}
              chosenProductsModal={chosenProductsModal}
              setChosenProductsModal={setChosenProductsModal}
            />
          )}

          {moreDetailsModal && (
            <MoreDetailsModal
              moreDetailsProduct={moreDetailsProduct}
              moreDetailsModal={moreDetailsModal}
              setMoreDetailsModal={setMoreDetailsModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Goods;
