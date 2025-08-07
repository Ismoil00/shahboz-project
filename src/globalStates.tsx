import { createContext, useState } from "react";
import type {
  ReactChildren,
  UserSession,
  GlobalStatesProps,
} from "./globalTypes";
import type { HomePageTableProps } from "./components/types";

export const emptySession = {
  id: 0,
  name: "",
  role: "",
  access_token: "",
  refresh_token: "",
  is_authenticated: false,
};

export const GlobalStates = createContext<GlobalStatesProps>({
  getSession: () => emptySession,
  homePageTable: [],
  setHomePageTable: () => {},
});

function GlobalStatesProvider({ children }: ReactChildren) {
  const [homePageTable, setHomePageTable] = useState<HomePageTableProps[]>([]);

  function getSession(): UserSession {
    const _session: string | null = localStorage.getItem("session");
    return !_session ? emptySession : JSON.parse(_session);
  }

  return (
    <GlobalStates.Provider
      value={{ getSession, homePageTable, setHomePageTable }}
    >
      {children}
    </GlobalStates.Provider>
  );
}

export default GlobalStatesProvider;
