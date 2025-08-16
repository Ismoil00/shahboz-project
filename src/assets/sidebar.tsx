import type { JSX } from "react";
import { GoHomeFill } from "react-icons/go";
import { AiFillProduct } from "react-icons/ai";
import { FcDebt } from "react-icons/fc";
// import { TbReportSearch } from "react-icons/tb";
import { FcSalesPerformance } from "react-icons/fc";
import { GiCalculator } from "react-icons/gi";

export interface SidebarMenuItem {
  id: string;
  title: string;
  path: string;
  for_role: string[];
  icon: JSX.Element;
}

export const renderSidebar = (): SidebarMenuItem[] => {
  return [
    {
      id: "home",
      title: "Главная",
      path: "/home",
      for_role: ["user", "admin"],
      icon: <GoHomeFill className="scale-150" />,
    },
    {
      id: "goods",
      title: "Товары",
      path: "/goods",
      for_role: ["user", "admin"],
      icon: <AiFillProduct className="scale-150" />,
    },
    {
      id: "sales",
      title: "Продажи",
      path: "/sales",
      for_role: ["user", "admin"],
      icon: <FcSalesPerformance className="scale-150" />,
    },
    {
      id: "debts",
      title: "Долги",
      path: "/debts",
      for_role: ["user", "admin"],
      icon: <FcDebt className="scale-150" />,
    },
    // {
    //   id: "reports",
    //   title: "Отчеты",
    //   path: "/reports",
    //   for_role: ["user", "admin"],
    //   icon: <TbReportSearch className="scale-150" />,
    // },
    {
      id: "calculator",
      title: "Калькулятор",
      path: "/calculator",
      for_role: ["user", "admin"],
      icon: <GiCalculator className="scale-150" />,
    },
  ];
};
