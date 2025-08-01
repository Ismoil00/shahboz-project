import type { MenuProps } from "antd";

export interface ButtonTypes {
  text: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  tailwindUtilities?: string | undefined;
}

export interface InputType {
  type: string;
  name: string;
  value: string | number | readonly string[] | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label?: string;
  error?: boolean;
  inputTailwindUtilities?: string | undefined;
  labelTailwindUtilities?: string | undefined;
}

export interface DropdownProps {
  text: string;
  items: MenuProps;
}