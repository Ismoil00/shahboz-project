import { useState } from "react";
import { Link } from "react-router-dom";
import type { SidebarMenuItem } from "../../assets/sidebar";
import { renderSidebar } from "../../assets/sidebar";
// import { IoLogOut } from "react-icons/io5";
// import type { UserSession } from "../../globalTypes";
import { useContext } from "react";
import { GlobalStates } from "../../globalStates";

export default function SidebarListItems({ version }: { version: string }) {
  const [active, setActive] = useState<string>("home");
  const { session } = useContext(GlobalStates);
  // const session: UserSession = JSON.parse(
  //   localStorage.getItem("session") as string
  // );

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
          className="w-16 hover:scale-105 duration-100 transition ease-in hover:drop-shadow-2xl"
        />
      </Link>
      {renderSidebar().map(
        (menu: SidebarMenuItem) =>
          menu.for_role.includes(session.role) && (
            <li
              key={menu.id}
              className="group/li"
              onClick={() => setActive(menu.id)}
            >
              <Link
                to={menu.path}
                className={`flex flex-col items-center gap-2 tracking-wider hover:text-hover-text transition duration-200 ${
                  active === menu.id ? "text-hover-text" : "text-default-text"
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
