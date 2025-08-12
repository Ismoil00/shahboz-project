import { Modal } from "antd";
import type { PurchaseProductProps } from "../../components/types";
import type { ChosenProductsModalProps } from "./types";
import Dropdwn from "../../components/dropdown";
import { items } from "../../assets/purchaseTypes";
import CustomCheckbox from "../../components/checkbox";
import InputNum from "../../components/inputNumber";
import Input from "../../components/input";

const ChosenProductsModal = ({
  chosenProducts,
  setChosenProducts,
  chosenProductsModal,
  setChosenProductsModal,
  handlePurchaseSave,
}: ChosenProductsModalProps) => {
  const handleFieldChange = (
    _product: number,
    field:
      | "payment_type"
      | "quantity"
      | "not_paid"
      | "client_name"
      | "client_number",
    value: string | boolean | number
  ) => {
    setChosenProducts(
      chosenProducts.map((p: PurchaseProductProps) =>
        p.product === _product
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
      onOk={async () => {
        await handlePurchaseSave();
        setChosenProductsModal(false);
      }}
      onCancel={() => setChosenProductsModal(false)}
      cancelText="Закрыть"
      okText="Сделать Покупку"
      wrapClassName="chosen-product-modal"
      style={{ top: 20 }}
    >
      <article className="py-5">
        {chosenProducts.map((product: PurchaseProductProps, index: number) => (
          <section
            key={product.product}
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
            <div className="flex flex-col gap-y-0.5 flex-1 min-w-[100px] pl-2">
              <p className="text-default-text/70 font-normal">Цена:</p>{" "}
              <p className="text-default-text font-semibold">
                {product.price} c.
              </p>
            </div>
            <div className="flex flex-col gap-y-0.5 flex-2 min-w-[100px]">
              <p className="text-default-text/70 font-normal">Название:</p>{" "}
              <p className="text-default-text font-semibold">{product.name}</p>
            </div>
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
                  handleFieldChange(product.product, "payment_type", type)
                }
                multiSelection={false}
                defaultValue={product.payment_type}
              />
              <p className="text-default-text font-semibold">
                {product.payment_type === "cash" ? "Наличный" : "Безналичный"}
              </p>
            </div>
            <div className="flex flex-col gap-y-0.5 flex-1 min-w-[100px]">
              <p className="text-default-text/70 font-normal">В долг:</p>
              <CustomCheckbox
                checked={product.not_paid}
                onChange={(e) =>
                  handleFieldChange(
                    product.product,
                    "not_paid",
                    e.target.checked
                  )
                }
              />
            </div>
            <div className="flex flex-col gap-y-0.5 flex-1 min-w-[100px]">
              <p className="text-default-text/70 font-normal">Количество:</p>{" "}
              <InputNum
                min={1}
                value={product.quantity}
                onChange={(value: number) =>
                  handleFieldChange(product.product, "quantity", value)
                }
              />
            </div>
            {product.not_paid && (
              <div className="flex flex-col gap-y-0.5 flex-2 min-w-[100px] pr-1">
                <p className="text-default-text/70 font-normal">ФИО Клиента:</p>{" "}
                <Input
                  name="ФИО Клиента"
                  onChange={(e) =>
                    handleFieldChange(
                      product.product,
                      "client_name",
                      e.target.value
                    )
                  }
                  placeholder="ФИО Клиента"
                  type="text"
                  value={product.client_name}
                  inputTailwindUtilities="bg-white! px-2! py-1! rounded-sm! border-black/10! border-[0.5px] text-default-text! focus:ring-primary! -mt-0.5!"
                />
              </div>
            )}
            {product.not_paid && (
              <div className="flex flex-col gap-y-0.5 flex-2 min-w-[100px]">
                <p className="text-default-text/70 font-normal">
                  Телефон Клиента:
                </p>{" "}
                <Input
                  name="Телефон Клиента"
                  onChange={(e) =>
                    handleFieldChange(
                      product.product,
                      "client_number",
                      Number(e.target.value)
                    )
                  }
                  placeholder="Телефон Клиента"
                  type="number"
                  value={product.client_number}
                  inputTailwindUtilities="bg-white! px-2! py-1! rounded-sm! border-black/10! border-[0.5px] text-default-text! focus:ring-primary! -mt-0.5!"
                />
              </div>
            )}
          </section>
        ))}
      </article>
    </Modal>
  );
};

export default ChosenProductsModal;
