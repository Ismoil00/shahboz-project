import { createContext, useState } from "react";
import type {
  ReactChildren,
  UserSession,
  GlobalStatesProps,
} from "./globalTypes";

export const emptySession = {
  id: 0,
  name: "",
  role: "",
  access_token: "",
  refresh_token: "",
  is_authenticated: false,
};

export const GlobalStates = createContext<GlobalStatesProps>({
  // session: emptySession,
  // setSession: () => {},
  getSession: () => emptySession,
});

function GlobalStatesProvider({ children }: ReactChildren) {
  // const [session, setSession] = useState<UserSession>(emptySession);

  function getSession(): UserSession {
    const _session: string | null = localStorage.getItem("session");
    return !_session ? emptySession : JSON.parse(_session);
  }

  return (
    <GlobalStates.Provider value={{ getSession }}>
      {children}
    </GlobalStates.Provider>
  );
}

export default GlobalStatesProvider;
