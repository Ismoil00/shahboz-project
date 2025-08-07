import type { ReactNode } from "react";
import type { HomePageTableProps } from "./components/types";

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
  getSession(): UserSession;
  homePageTable: HomePageTableProps[];
  setHomePageTable: React.Dispatch<React.SetStateAction<HomePageTableProps[]>>;
}
