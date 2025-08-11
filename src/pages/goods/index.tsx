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

  /* 
[
{
  "user": 1,
  "client_name": "Alice Smith",
  "client_number": 987654,
  "product": 4,
  "quantity": 2,
  "not_paid": false,
  "payment_type": "cash"
},
{
  "user": 1,
  "client_name": "Alice Smith",
  "client_number": 987654,
  "product": 21,
  "quantity": 1,
  "not_paid": true,
  "payment_type": "cash"
}

name: string;
price: number;
in_stock: number;

  product: number;
  quantity: number;
  payment_type: string;
  not_paid: boolean;
  user?: number;
  client_number?: number;
  client_name?: string;
]
*/

  /* handling chosen products purchase */
  const handlePurchaseSave = async () => {
    const filteredData = chosenProducts.map((product: PurchaseProductProps) => {
      const { name, price, in_stock, ...rest } = product;
      return rest;
    });

    try {
      setLoader(true);

      /* SERVER REQUEST */
      const response = await customServerRequest(`purchase/create/`, "POST", {
        filteredData,
      });

      /* HTTP ERROR HANDLE */
      if (response.status !== 200) throw response;

      console.log("RESPONSE", response);
      const data = await response.json();
      console.log("DATA", data);

      /* SUCCESS */
      Notify("Покупка Успешно Сделана", "success");
      setChosenProducts([]);
    } catch (error: any) {
      Notify("PRODUCTS PURCHASE ERROR", "error");
      console.error("PRODUCTS PURCHASE ERROR: ", error);
    } finally {
      setLoader(false);
    }
  };

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
                    (el: PurchaseProductProps) => el.product === product.id
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
              handlePurchaseSave={handlePurchaseSave}
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
