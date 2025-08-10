import type { MenuProps } from "antd";
import { BsCash } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";

export const items: MenuProps["items"] = [
  {
    key: "cash",
    label: <p className="text-default-text pl-1">Наличный</p>,
    icon: <BsCash className="scale-200 text-default-text" />,
    extra: "Наличный",
  },
  {
    key: "card",
    label: <p className="text-default-text pl-1">Безналичный</p>,
    icon: <CiCreditCard1 className="scale-200 text-default-text" />,
    extra: "Безналичный",
  },
];
