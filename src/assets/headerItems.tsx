import type { MenuProps } from "antd";
import { IoLogOut } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import Logout from "../components/logout";

export const items: MenuProps["items"] = [
  {
    key: "settings",
    label: (
      <Link to={"/settings"}>
        <p className="text-default-text">Settings</p>
      </Link>
    ),
    icon: <IoMdSettings className="scale-200 text-default-text" />,
  },
  {
    key: "logout",
    label: (
      <div className="text-default-text">
        <Logout />
      </div>
    ),
    icon: <IoLogOut className="scale-200 text-default-text" />,
  },
];
