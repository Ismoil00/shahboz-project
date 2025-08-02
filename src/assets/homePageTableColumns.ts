import type { TableProps } from "antd";
import type { HomePageTableProps } from "../components/types";

export const HomePageTableColumns: TableProps<HomePageTableProps>["columns"] = [
  {
    key: "product_code",
    dataIndex: "product_code",
    title: "Код Товара",
  },
  {
    key: "product_name",
    dataIndex: "product_name",
    title: "Название",
  },
  {
    key: "product_price",
    dataIndex: "product_price",
    title: "Цена",
  },
  {
    key: "product_affordable_quantity",
    dataIndex: "product_affordable_quantity",
    title: "Доступное Количество",
  },
];
