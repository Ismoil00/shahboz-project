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
    sorter: (a, b) => a.client_name.localeCompare(b.client_name),
  },
  {
    key: "product",
    dataIndex: "product",
    title: "Продукты",
    sorter: (a, b) => a.product.localeCompare(b.product),
  },
  {
    key: "sold_at",
    dataIndex: "sold_at",
    title: "Дата Покупки",
    sorter: (a, b) => {
      const dateA = new Date(a.sold_at).getTime();
      const dateB = new Date(b.sold_at).getTime();
      return dateA - dateB;
    },
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
    sorter: (a, b) => a.remaining_debt - b.remaining_debt,
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
