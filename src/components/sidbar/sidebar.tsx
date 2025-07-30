import { useState } from "react";
import { Link } from "react-router-dom";
import type { SidebarMenuItem } from "../../assets/sidebar";
import { renderSidebar } from "../../assets/sidebar";
import { IoLogOut } from "react-icons/io5";

export default function SidebarListItems({ version }: { version: string }) {
  const [active, setActive] = useState<string>("home");

  return (
    <ul
      className={`w-full flex flex-col gap-14 items-center ${
        version === "mobile" ? "" : "pt-10 h-full"
      }`}
    >
      <Link to="/" onClick={() => setActive("home")}>
        <img
          src="/public/logo.png"
          alt="website logo"
          className="w-20 hover:scale-105 duration-100 transition ease-in"
        />
      </Link>
      {renderSidebar(active).map((menu: SidebarMenuItem) => (
        <li
          key={menu.id}
          className="group/li"
          onClick={() => setActive(menu.id)}
        >
          <Link
            to={menu.path}
            className="flex flex-col items-center gap-2 text-xl text-default-text font-bold tracking-wider hover:text-hover-text transition duration-200"
          >
            {menu.icon}
            {menu.title}
          </Link>
        </li>
      ))}
      <li className="flex-1 flex items-end pb-10">
        <button
          className="flex gap-2 items-center justify-center cursor-pointer text-xl text-default-text font-bold tracking-wider hover:text-hover-text transition duration-200"
          onClick={() => console.log("log out")}
        >
          <IoLogOut className="scale-150" /> Выход
        </button>
      </li>
    </ul>
  );
}
