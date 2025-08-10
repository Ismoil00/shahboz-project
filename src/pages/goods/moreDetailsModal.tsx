import { Modal } from "antd";
import type { MoreDetailsModalProps } from "./types";

const MoreDetailsModal = ({
  moreDetailsProduct,
  moreDetailsModal,
  setMoreDetailsModal,
}: MoreDetailsModalProps) => {
  return (
    <Modal
      title="Подробнее о Товаре"
      open={moreDetailsModal}
      onCancel={() => setMoreDetailsModal(false)}
      wrapClassName="more-details-modal"
      footer={false}
    >
      <img
        src="public/product-icon.png"
        alt="product image"
        className="w-full object-cover rounded-t-2xl"
      />
      <div className="texts pl-3 py-3 flex flex-col gap-2 text-[16px] font-semibold text-default-text">
        <p>
          <span className="text-default-text/70 font-normal">Цена:</span>{" "}
          {moreDetailsProduct.price} c.
        </p>
        <p>
          <span className="text-default-text/70 font-normal">Код товара:</span>{" "}
          {moreDetailsProduct.code}
        </p>
        <p>
          <span className="text-default-text/70 font-normal">Название:</span>{" "}
          {moreDetailsProduct.name}
        </p>
        <p>
          <span className="text-default-text/70 font-normal">Описание:</span>{" "}
          {moreDetailsProduct.description}
        </p>
        <p>
          <span className="text-default-text/70 font-normal">
            Доступное количество:
          </span>{" "}
          {moreDetailsProduct.in_stock}
        </p>
      </div>
    </Modal>
  );
};

export default MoreDetailsModal;
