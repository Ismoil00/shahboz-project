import { Navigate } from "react-router-dom";
import type { ReactChildren } from "../globalTypes";
import { useContext } from "react";
import { GlobalStates } from "../globalStates";

export default function ProtectedRoutes({ children }: ReactChildren) {
  const { getSession } = useContext(GlobalStates);

  return getSession().is_authenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={"/login"} />
  );
}
