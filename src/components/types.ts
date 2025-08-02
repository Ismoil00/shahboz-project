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

export interface HomePageTableProps {
  key: string | number;
  product_code: number;
  product_name: string;
  product_price: number;
  product_affordable_quantity: number;
}

export interface DebtsPageTableProps {
  key: string | number;
  phone_number: number;
  customer_fullname: string;
  purchased_products: string[];
  purchased_date: string;
  total_price: number;
  left_price: number;
}
