import { Modal } from "antd";
import { FaRegCheckCircle } from "react-icons/fa";
import type { SuccessPurchaseModalProps } from "./types";

function SuccessPurchaseModal({
  purchaseSuccessModal,
  purchaseSuccessInfo,
  setPurchaseSuccessModal,
}: SuccessPurchaseModalProps) {
  return (
    <Modal
      title="Покупка прошла успешно"
      open={purchaseSuccessModal}
      onCancel={() => setPurchaseSuccessModal(false)}
      wrapClassName="successful-purchase"
      footer={false}
      // style={{ top: 20 }}
    >
      <div className="flex items-center justify-center my-5">
        <FaRegCheckCircle size={80} color="green" />
      </div>
      <div className="flex items-center justify-center my-5 text-2xl">
        Ваш Чек:
        <span className="text-[#008000] ml-2 font-semibold">
          {purchaseSuccessInfo.total_purchase}
        </span>
      </div>
    </Modal>
  );
}

export default SuccessPurchaseModal;
