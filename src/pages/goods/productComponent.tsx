import Button from "../../components/button";
import type { ProductComponentProps } from "./types";
import type {
  ProductProps,
  PurchaseProductProps,
} from "../../components/types";

const ProductComponent = ({
  product,
  isChosen,
  setChosenProducts,
  setMoreDetailsModal,
  setMoreDetailsProduct,
}: ProductComponentProps) => {
  const handleProductToPurchase = (_product: ProductProps) => {
    setChosenProducts((p: PurchaseProductProps[]) => {
      const exists = p.some(
        (el: PurchaseProductProps) => el.id === _product.id
      );

      return exists
        ? [...p.filter((el: PurchaseProductProps) => el.id !== _product.id)]
        : [
            ...p,
            {
              ..._product,
              purchase_type: "cash",
              purchase_quantity: 1,
              in_debt: false,
            },
          ];
    });
  };

  return (
    <section className="w-80 h-fit flex flex-col bg-gray-bg rounded-2xl shadow-lg relative z-0">
      {isChosen && (
        <div
          className={`cover absolute top-0 bottom-0 right-0 left-0 bg-white opacity-50 rounded-2xl z-10`}
        ></div>
      )}
      <img
        src="public/product-icon.png"
        alt="product image"
        className="w-full object-cover rounded-t-2xl"
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
        tailwindUtilities="rounded-2xl! bg-secondary! hover:bg-secondary/70! duration-200 transition cursor-pointer z-20!"
      />
    </section>
  );
};

export default ProductComponent;
