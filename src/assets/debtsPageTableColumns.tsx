import type { TableProps } from "antd";
import type { DebtsPageTableProps } from "../components/types";
import { CiCreditCard1 } from "react-icons/ci";

export const GetDebtPageTableColumns = (
  onPayClick: (record: DebtsPageTableProps) => void
): TableProps<DebtsPageTableProps>["columns"] => [
  {
    key: "row_number",
    title: "№",
    render: (_, __, index) => <span>{index + 1}</span>,
  },
  {
    key: "client_number",
    dataIndex: "client_number",
    title: "Номер Телефона",
  },
  {
    key: "client_name",
    dataIndex: "client_name",
    title: "ФИО Покупателя",
  },
  {
    key: "product",
    dataIndex: "product",
    title: "Продукты",
  },
  {
    key: "sold_at",
    dataIndex: "sold_at",
    title: "Дата Покупки",
  },
  {
    key: "total_price",
    dataIndex: "total_price",
    title: "Полная Сумма",
    sorter: (a, b) => a.total_price - b.total_price,
  },
  {
    key: "remaining_debt",
    dataIndex: "remaining_debt",
    title: "Оставшаяся Сумма",
  },
  {
    key: "actions",
    title: "Выплатить долг",
    render: (_, record) => (
      <button className="cursor-pointer" onClick={() => onPayClick(record)}>
        <CiCreditCard1
          size={40}
          color="#003a6b"
          className="hover:scale-110 transition duration-100"
        />
      </button>
    ),
  },
];
