import { useEffect, useState } from "react";
import Header from "../../components/header";
import SearchBar from "../../components/searchBar";
import Spinner from "../../components/spinner";
import customServerRequest from "../../components/customFetch";
import Notify from "../../components/toast";
import type {
  HomePageTableProps,
  ProductProps,
  PurchaseProductProps,
} from "../../components/types";
import MoreDetailsModal from "./moreDetailsModal";
import ProductComponent from "./productComponent";
import ChosenProductsModal from "./chosenProductsModal";
import ChosenProductsBtns from "./chosenProductsBtns";
import { useContext } from "react";
import { GlobalStates } from "../../globalStates";

const Goods = () => {
  const [searchedText, setSearchedText] = useState("");
  const [loader, setLoader] = useState(false);
  /* existing + searched products */
  const [products, setProducts] = useState<ProductProps[]>([]);
  const { homePageTable } = useContext(GlobalStates);
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

  /* we display the home-page-products on this page */
  useEffect(() => {
    if (homePageTable.length === 0) return;

    setProducts(
      homePageTable.map((p: HomePageTableProps) => ({
        ...p,
        id: +p.key,
      }))
    );
  }, []);

  /* finding searched term */
  const handleSearch = async () => {
    try {
      setLoader(true);

      /* SERVER REQUEST */
      const response = await customServerRequest(`products/${searchedText}`);

      /* HTTP ERROR HANDLE */
      if (response.status !== 200) throw response;

      const data = await response.json();

      setProducts([{ ...data }]);

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
              placeholder="Поиск Товара (можете нажать ENTER для поиска)"
              onKeyDown={handleKeyDown}
            />
          </div>

          {products.length > 0 ? (
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
          ) : (
            <div className="w-full grid place-content-center text-3xl font-bold text-red-500 pt-10 pl-10">
              Нету товаров, делайте поиск
            </div>
          )}

          {chosenProducts.length > 0 && (
            <ChosenProductsBtns
              cleanChosenProducts={cleanChosenProducts}
              setChosenProductsModal={setChosenProductsModal}
            />
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
