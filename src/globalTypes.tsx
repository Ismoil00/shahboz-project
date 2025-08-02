import type { ReactNode } from "react";

export interface ReactChildren {
  children: ReactNode;
}

export interface UserSession {
  id: number;
  name: string;
  role: string;
  access_token: string;
  refresh_token: string;
  is_authenticated: boolean;
}

export interface GlobalStatesProps {
  session: UserSession;
  setSession: React.Dispatch<React.SetStateAction<UserSession>>;
}