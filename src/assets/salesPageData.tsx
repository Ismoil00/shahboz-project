import { IoTodayOutline } from "react-icons/io5";
import { BsCalendarWeek } from "react-icons/bs";
import { MdCalendarMonth } from "react-icons/md";
import type { MenuProps, TableProps } from "antd";
import type { SalesProps } from "../pages/sales/types";

export const SalesTableColumns: TableProps<SalesProps>["columns"] = [
  {
    key: "row_number",
    title: "№",
    render: (record) => <span>{record.key}</span>,
  },
  {
    key: "product_name",
    dataIndex: "product_name",
    title: "Название",
    sorter: (a, b) => a.product_name.localeCompare(b.product_name),
  },
  {
    key: "total_quantity",
    dataIndex: "total_quantity",
    title: "Продано в количестве",
    sorter: (a, b) => a.total_quantity - b.total_quantity,
  },
  {
    key: "seller",
    dataIndex: "seller",
    title: "Продавец",
    sorter: (a, b) => a.seller.localeCompare(b.seller),
  },
  {
    key: "total_price",
    dataIndex: "total_price",
    title: "Сумма",
    sorter: (a, b) => a.total_price - b.total_price,
  },
  {
    key: "sold",
    dataIndex: "sold",
    title: "Проданно",
    sorter: (a, b) => {
      const dateA = new Date(a.sold).getTime();
      const dateB = new Date(b.sold).getTime();
      return dateA - dateB;
    },
  },
];

export const salesPageDropdownItems: MenuProps["items"] = [
  {
    key: "daily",
    label: <p className="ml-2">За сегодня</p>,
    icon: <IoTodayOutline className="scale-200 text-default-text" />,
  },
  {
    key: "weekly",
    label: <p className="ml-2">За неделю</p>,
    icon: <BsCalendarWeek className="scale-180 text-default-text" />,
  },
  {
    key: "monthly",
    label: <p className="ml-2">За месяц</p>,
    icon: <MdCalendarMonth className="scale-210 text-default-text" />,
  },
];
