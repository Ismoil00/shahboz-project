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
      // open={true}
      onCancel={() => setPurchaseSuccessModal(false)}
      wrapClassName="successful-purchase"
      footer={false}
    >
      <div className="flex items-center justify-center my-5">
        <FaRegCheckCircle size={50} color="green" />
      </div>
      <article className="w-[400px] flex flex-col gap-[10px] m-auto">
        {/* HEADER */}
        <section className="w-full flex justify-between border-b-[1px] border-black/20">
          <section className="flex gap-1">
            <div className="w-[30px]">Кол.</div>
            <div className="w-[150px]"> Название </div>
          </section>
          <div className="w-[80px] text-right">Цена</div>
        </section>

        {/* CHECK */}
        {purchaseSuccessInfo.purchases.map((el: any, i: number) => (
          <section key={i} className="w-full flex justify-between">
            <section className="flex gap-1">
              <div className="w-[30px]">{el.quantity}</div>
              <div className="w-[150px]">{el.product}</div>
            </section>
            <div className="w-[80px] text-right">{el.total_price}</div>
          </section>
        ))}

        {/* TOTAL */}
        <section className="w-full flex justify-between border-t-[1px] border-black/20">
          <section className="flex gap-1">
            <div className="w-[30px] font-semibold text-lg">
              {purchaseSuccessInfo.purchases.reduce((acc: number, el: any) => {
                return (acc = acc + el.quantity);
              }, 0)}
            </div>
            <div className="w-[150px] font-semibold text-lg">Всего</div>
          </section>
          <div className="w-[80px] text-right font-semibold text-lg">
            {purchaseSuccessInfo.total_purchase}
          </div>
        </section>
      </article>
    </Modal>
  );
}

export default SuccessPurchaseModal;
