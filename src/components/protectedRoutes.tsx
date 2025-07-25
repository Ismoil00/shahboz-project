import { Navigate } from "react-router-dom";
import type { ReactChildren } from "../globalTypes";

export default function ProtectedRoutes({ children }: ReactChildren) {
  const isAuthenticated: boolean = localStorage.getItem("session") !== null;

  return isAuthenticated ? <>{children}</> : <Navigate to={"/login"} />;
}
