import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { SidebarMenuItem } from "../../assets/types";
import { renderSidebar } from "../../assets/sidebar";
import { useContext } from "react";
import { GlobalStates } from "../../globalStates";
import { useLocation } from "react-router-dom";

export default function SidebarListItems({ version }: { version: string }) {
  const location = useLocation();
  const [active, setActive] = useState<string>("/home");
  const { getSession } = useContext(GlobalStates);
  const session = getSession();

  useEffect(() => setActive(location.pathname), []);

  return (
    <ul
      className={`w-full flex flex-col gap-8 items-center ${
        version === "mobile" ? "" : "pt-10 h-full"
      }`}
    >
      <Link to="/" onClick={() => setActive("/home")}>
        <img
          src="/public/logo.png"
          alt="website logo"
          className="w-16 hover:scale-105 duration-100 transition ease-in hover:drop-shadow-2xl"
        />
      </Link>
      {renderSidebar().map(
        (menu: SidebarMenuItem) =>
          menu.for_role.includes(session.role) && (
            <li
              key={menu.id}
              className="group/li"
              onClick={() => setActive(menu.path)}
            >
              <Link
                to={menu.path}
                className={`flex flex-col items-center gap-2 tracking-wider hover:text-hover-text transition duration-200 ${
                  active === menu.path ? "text-hover-text" : "text-default-text"
                }`}
              >
                {menu.icon}
                {menu.title}
              </Link>
            </li>
          )
      )}
    </ul>
  );
}
