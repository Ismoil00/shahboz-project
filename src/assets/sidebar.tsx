import type { SidebarMenuItem } from "./types";
import { GoHomeFill } from "react-icons/go";
import { AiFillProduct } from "react-icons/ai";
import { FcDebt } from "react-icons/fc";
import { FcSalesPerformance } from "react-icons/fc";
import { GiCalculator } from "react-icons/gi";

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
    {
      id: "calculator",
      title: "Калькулятор",
      path: "/calculator",
      for_role: ["user", "admin"],
      icon: <GiCalculator className="scale-150" />,
    },
  ];
};
