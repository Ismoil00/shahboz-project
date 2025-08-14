import type { DebtsPageTableProps } from "../../components/types";

export interface DebtsTableProps {
  tableData: DebtsPageTableProps[];
  handlePayBtnClick: (record: DebtsPageTableProps) => void;
  totalCount: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface PayDebtProps {
  purchase_id: number;
  amount: number;
}