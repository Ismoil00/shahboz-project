import Button from "../../components/button";
import type { ProductComponentProps } from "./types";
import type {
  ProductProps,
  PurchaseProductProps,
} from "../../components/types";
import { GlobalStates } from "../../globalStates";
import { useContext } from "react";

const ProductComponent = ({
  product,
  isChosen,
  setChosenProducts,
  setMoreDetailsModal,
  setMoreDetailsProduct,
}: ProductComponentProps) => {
  const { getSession } = useContext(GlobalStates);
  const session = getSession();

  const handleProductToPurchase = (_product: ProductProps) => {
    setChosenProducts((p: PurchaseProductProps[]) => {
      const exists = p.some(
        (el: PurchaseProductProps) => el.product === _product.id
      );

      return exists
        ? [
            ...p.filter(
              (el: PurchaseProductProps) => el.product !== _product.id
            ),
          ]
        : [
            ...p,
            {
              product: _product.id,
              payment_type: "cash",
              quantity: 1,
              name: _product.name,
              price: _product.price,
              in_stock: _product.in_stock,
              not_paid: false,
              user: session.id,
              client_number: Number(new Date()),
              client_name: "",
            },
          ];
    });
  };

  return (
    <section className="w-60 h-fit flex flex-col bg-gray-bg rounded-lg shadow-2xl relative z-0 border-primary/5 border-[0.5px]">
      {isChosen && (
        <div
          className={`cover absolute top-0 bottom-0 right-0 left-0 bg-white opacity-70 rounded-2xl z-10`}
        ></div>
      )}
      <img
        src="public/product-icon.png"
        alt="product image"
        className="w-full h-52 object-cover rounded-t-2xl"
      />
      <div className="texts pl-3 py-3 flex flex-col gap-2 text-default-text">
        <p>
          <span className="text-default-text/70">Код товара:</span>{" "}
          <span className="text-secondary font-medium">{product.code}</span>
        </p>
        <p>
          <span className="text-default-text/70">Доступное количество:</span>{" "}
          <span className="text-secondary font-medium">{product.in_stock}</span>
        </p>
        <p
          className="text-hover-text cursor-pointer transition duration-200 hover:text-hover-text/70 underline"
          onClick={() => {
            setMoreDetailsProduct({ ...product });
            setMoreDetailsModal(true);
          }}
        >
          Подробнее
        </p>
      </div>
      <Button
        text={`${isChosen ? "Убрать" : "Добавить"}`}
        onClick={() => handleProductToPurchase(product)}
        tailwindUtilities={`rounded-2xl! py-2! duration-200 transition cursor-pointer z-20! ${
          isChosen
            ? "bg-secondary! hover:bg-secondary/70!"
            : "bg-default-text hover:bg-hover-text"
        }`}
      />
    </section>
  );
};

export default ProductComponent;
