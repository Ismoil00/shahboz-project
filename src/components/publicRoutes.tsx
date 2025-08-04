import { Navigate } from "react-router-dom";
import type { ReactChildren } from "../globalTypes";
import { useContext } from "react";
import { GlobalStates } from "../globalStates";

export default function PublicRoutes({ children }: ReactChildren) {
  const { session } = useContext(GlobalStates);

  //  console.log("SESSION", session);

  return session.is_authenticated ? <Navigate to={"/"} /> : <>{children}</>;
}
