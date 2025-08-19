import type { JSX } from "react";

export interface SidebarMenuItem {
  id: string;
  title: string;
  path: string;
  for_role: string[];
  icon: JSX.Element;
}
