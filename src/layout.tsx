import Sidebar from "./components/sidbar";
import { Outlet } from "react-router-dom";
// import NewSessionDetected from "../components/newSessionDetected";

export default function Layout() {
  return (
    <div className="flex">
      {/* <NewSessionDetected /> */}
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
