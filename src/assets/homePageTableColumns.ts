import type { TableProps } from "antd";
import type { HomePageTableProps } from "../components/types";

export const HomePageTableColumns: TableProps<HomePageTableProps>["columns"] = [
  {
    key: "code",
    dataIndex: "code",
    title: "Код Товара",
  },
  {
    key: "name",
    dataIndex: "name",
    title: "Название",
  },
  {
    key: "description",
    dataIndex: "description",
    title: "Описание",
  },
  {
    key: "price",
    dataIndex: "price",
    title: "Цена",
  },
  {
    key: "in_stock",
    dataIndex: "in_stock",
    title: "Доступное Количество",
  },
];
