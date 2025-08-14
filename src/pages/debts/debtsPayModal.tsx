import { Modal } from "antd";
import Input from "../../components/input";
import Button from "../../components/button";
import type { PayDebtProps } from "./types";

interface DebtsPayModalProps {
  payDebt: PayDebtProps;
  debtAmountModal: boolean;
  handlePayClick: () => Promise<void>;
  setDebtAmountModal: React.Dispatch<React.SetStateAction<boolean>>;
  handlePayDebtChange: (key: string, value: number) => void;
}

function DebtsPayModal({
  payDebt,
  debtAmountModal,
  handlePayClick,
  setDebtAmountModal,
  handlePayDebtChange,
}: DebtsPayModalProps) {
  return (
    <Modal
      title="Введите сумму платежа"
      open={debtAmountModal}
      onCancel={() => setDebtAmountModal(false)}
      wrapClassName="more-details-modal"
      footer={<Button text="Оплатить" onClick={handlePayClick}></Button>}
    >
      <Input
        name="amount"
        onChange={(e) => handlePayDebtChange("amount", Number(e.target.value))}
        placeholder="сумма платижа"
        type="number"
        value={payDebt.amount}
      />
    </Modal>
  );
}

export default DebtsPayModal;
