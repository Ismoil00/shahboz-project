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
}
