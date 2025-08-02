import type { TableProps } from "antd";
import type { DebtsPageTableProps } from "../components/types";

export const DebtPageTableColumns: TableProps<DebtsPageTableProps>["columns"] =
  [
    {
      key: "phone_number",
      dataIndex: "phone_number",
      title: "Номер Телефона",
    },
    {
      key: "customer_fullname",
      dataIndex: "customer_fullname",
      title: "ФИО Покупателя",
    },
    {
      key: "purchased_products",
      dataIndex: "purchased_products",
      title: "Продукты",
    },
    {
      key: "purchased_date",
      dataIndex: "purchased_date",
      title: "Дата Покупки",
    },
    {
      key: "total_price",
      dataIndex: "total_price",
      title: "Полная Сумма",
    },
    {
      key: "left_price",
      dataIndex: "left_price",
      title: "Оставшаяся Сумма",
    },
  ];
