import type { TableProps } from "antd";
import type { HomePageTableProps } from "../components/types";

export const HomePageTableColumns: TableProps<HomePageTableProps>["columns"] = [
  {
    key: "code",
    dataIndex: "code",
    title: "Код Товара",
    sorter: (a, b) => a.code - b.code,
  },
  {
    key: "name",
    dataIndex: "name",
    title: "Название",
    sorter: (a, b) => a.name.localeCompare(b.name), // alphabetical sort
  },
  // {
  //   key: "description",
  //   dataIndex: "description",
  //   title: "Описание",
  // },
  {
    key: "price",
    dataIndex: "price",
    title: "Цена",
    sorter: (a, b) => a.price - b.price,
  },
  {
    key: "in_stock",
    dataIndex: "in_stock",
    title: "Доступное Количество",
    sorter: (a, b) => a.in_stock - b.in_stock,
  },
];
