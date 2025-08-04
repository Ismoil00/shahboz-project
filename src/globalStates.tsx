import { createContext, useState } from "react";
import type {
  ReactChildren,
  UserSession,
  GlobalStatesProps,
} from "./globalTypes";

const emptySession = {
  id: 0,
  name: "",
  role: "",
  access_token: "",
  refresh_token: "",
  is_authenticated: false,
};

export const GlobalStates = createContext<GlobalStatesProps>({
  session: emptySession,
  setSession: () => {},
});

function GlobalStatesProvider({ children }: ReactChildren) {
  const [session, setSession] = useState<UserSession>(emptySession);

  console.log("SESSION", session);

  return (
    <GlobalStates.Provider value={{ session, setSession }}>
      {children}
    </GlobalStates.Provider>
  );
}

export default GlobalStatesProvider;
