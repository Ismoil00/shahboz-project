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
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
}

export interface SearchBarCompProps {
  searchedText: string;
  setSearchedText: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => Promise<void>;
  placeholder?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
}

export interface DropdownProps {
  text: string;
  items: MenuProps["items"];
  dropdownTailwindcss?: string;
  getChosenDropdownElement?: (key: string) => void;
  multiSelection?: boolean;
  defaultValue?: string;
}

export interface HomePageTableProps {
  key: string | number;
  code: number;
  name: string;
  description: string;
  price: number;
  in_stock: number;
  active?: boolean;
}

export interface ProductProps {
  id: number;
  code: number;
  name: string;
  description: string;
  price: number;
  in_stock: number;
  active?: boolean;
}

export interface PurchaseProductProps {
  id: number;
  code: number;
  name: string;
  description: string;
  price: number;
  in_stock: number;
  active?: boolean;
  purchase_quantity: number;
  purchase_type: string;
  in_debt: boolean;
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
