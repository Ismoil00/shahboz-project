import type { JSX } from "react";
import { GoHomeFill } from "react-icons/go";
import { AiFillProduct } from "react-icons/ai";
import { FcDebt } from "react-icons/fc";
import { TbReportSearch } from "react-icons/tb";

export interface SidebarMenuItem {
  id: string;
  title: string;
  path: string;
  icon: JSX.Element;
}

export const renderSidebar = (): SidebarMenuItem[] => {
  return [
    {
      id: "home",
      title: "Главная",
      path: "/home",
      icon: <GoHomeFill className="scale-150" />,
    },
    {
      id: "goods",
      title: "Товары",
      path: "/goods",
      icon: <AiFillProduct className="scale-150" />,
    },
    {
      id: "debts",
      title: "Долги",
      path: "/debts",
      icon: <FcDebt className="scale-150" />,
    },
    {
      id: "reports",
      title: "Отчеты",
      path: "/reports",
      icon: <TbReportSearch className="scale-150" />,
    },
  ];
};
