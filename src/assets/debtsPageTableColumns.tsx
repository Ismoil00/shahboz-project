import type { TableProps } from "antd";
import type { DebtsPageTableProps } from "../components/types";

export const DebtPageTableColumns: TableProps<DebtsPageTableProps>["columns"] =
  [
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
    },
    {
      key: "remaining_debt",
      dataIndex: "remaining_debt",
      title: "Оставшаяся Сумма",
    },
    {
      key: "actions",
      title: "Выплатить долг",
      render: (text, record) => (
        <button
          className="cursor-pointer"
          onClick={() => console.log("Clicked", record)}
        >
          Оплатить
        </button>
      ),
    },
  ];
