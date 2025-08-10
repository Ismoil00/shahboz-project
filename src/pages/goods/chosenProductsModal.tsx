import { Modal } from "antd";
import type { PurchaseProductProps } from "../../components/types";
import type { ChosenProductsModalProps } from "./types";
import Dropdwn from "../../components/dropdown";
import { items } from "../../assets/purchaseTypes";
import CustomCheckbox from "../../components/checkbox";
import InputNum from "../../components/inputNumber";

const ChosenProductsModal = ({
  chosenProducts,
  setChosenProducts,
  chosenProductsModal,
  setChosenProductsModal,
}: ChosenProductsModalProps) => {
  const handleFieldChange = (
    id: number,
    field: "purchase_type" | "purchase_quantity" | "in_debt",
    value: string | boolean | number
  ) => {
    setChosenProducts(
      chosenProducts.map((p: PurchaseProductProps) =>
        p.id === id
          ? {
              ...p,
              [field]: value,
            }
          : p
      )
    );
  };

  return (
    <Modal
      title="Выбранные Товары"
      closable={{ "aria-label": "Custom Close Button" }}
      open={chosenProductsModal}
      onOk={() => setChosenProductsModal(false)}
      onCancel={() => setChosenProductsModal(false)}
      cancelText="Закрыть"
      okText="Сделать Покупку"
      wrapClassName="chosen-product-modal"
    >
      <article className="py-5">
        {chosenProducts.map((product: PurchaseProductProps, index: number) => (
          <section
            key={product.id}
            className={`flex justify-between items-center ${
              chosenProducts.length - 1 !== index &&
              "border-b-default-text/10 border-b-[1px]"
            }`}
          >
            <img
              src="public/product-icon.png"
              alt="product image"
              className="w-[100px] h-[100px] object-cover rounded-full"
            />
            <div className="flex flex-col gap-y-0.5 flex-2 min-w-[100px] pl-2">
              <p className="text-default-text/70 font-normal">Цена:</p>{" "}
              <p className="text-default-text font-semibold">
                {product.price} c.
              </p>
            </div>
            <div className="flex flex-col gap-y-0.5 flex-2 min-w-[100px]">
              <p className="text-default-text/70 font-normal">Код товара:</p>{" "}
              <p className="text-default-text font-semibold">{product.code}</p>
            </div>
            <div className="flex flex-col gap-y-0.5 flex-2 min-w-[100px]">
              <p className="text-default-text/70 font-normal">Название:</p>{" "}
              <p className="text-default-text font-semibold">{product.name}</p>
            </div>
            {/* <div className="flex flex-col gap-y-0.5 flex-3 min-w-[100px] px-2">
              <p className="text-default-text/70 font-normal">Описание:</p>{" "}
              <p className="text-default-text font-semibold">
                {product.description}
              </p>
            </div> */}
            <div className="flex flex-col gap-y-0.5 flex-2 min-w-[100px]">
              <p className="text-default-text/70 font-normal">
                Доступное количество:
              </p>{" "}
              <p className="text-default-text font-semibold">
                {product.in_stock}
              </p>
            </div>
            <div className="flex flex-col gap-y-0.5 flex-2 min-w-[100px]">
              <Dropdwn
                text="Тип оплаты"
                items={items}
                dropdownTailwindcss="text-default-text/70! font-normal!"
                getChosenDropdownElement={(type: string) =>
                  handleFieldChange(product.id, "purchase_type", type)
                }
                multiSelection={false}
                defaultValue={product.purchase_type}
              />
              <p className="text-default-text font-semibold">
                {product.purchase_type === "cash" ? "Наличный" : "Безналичный"}
              </p>
            </div>
            <div className="flex flex-col gap-y-0.5 flex-1 min-w-[100px]">
              <p className="text-default-text/70 font-normal">В долг:</p>
              <CustomCheckbox
                checked={product.in_debt}
                onChange={(e) =>
                  handleFieldChange(product.id, "in_debt", e.target.checked)
                }
              />
            </div>
            <div className="flex flex-col gap-y-0.5 flex-2 min-w-[100px]">
              <p className="text-default-text/70 font-normal">Количество:</p>{" "}
              <InputNum
                min={1}
                value={product.purchase_quantity}
                onChange={(value: number) =>
                  handleFieldChange(product.id, "purchase_quantity", value)
                }
              />
            </div>
          </section>
        ))}
      </article>
    </Modal>
  );
};

export default ChosenProductsModal;
