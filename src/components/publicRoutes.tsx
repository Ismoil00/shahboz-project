import { Navigate } from "react-router-dom";
import type { ReactChildren } from "../globalTypes";
import { useContext } from "react";
import { GlobalStates } from "../globalStates";

export default function PublicRoutes({ children }: ReactChildren) {
  const { session } = useContext(GlobalStates);
  // const isAuthenticated: boolean = localStorage.getItem("session") !== null;

  return session.is_authenticated ? <Navigate to={"/"} /> : <>{children}</>;
}
