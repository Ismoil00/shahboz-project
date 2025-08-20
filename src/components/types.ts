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
  handleSearch: () => void;
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
  image: string;
  description: string;
  price: number;
  in_stock: number;
  active?: boolean;
}

export interface ProductProps {
  id: number;
  code: number;
  name: string;
  image: string;
  description: string;
  price: number;
  in_stock: number;
  active?: boolean;
}

export interface PurchaseProductProps {
  product: number;
  name: string;
  price: number;
  in_stock: number;
  quantity: number;
  payment_type: string;
  not_paid: boolean;
  user?: number;
  client_number?: number;
  client_name?: string;
}

export interface DebtsPageTableProps {
  key: string | number;
  id: number;
  client_number: number;
  client_name: string;
  product: string;
  sold_at: string;
  total_price: number;
  remaining_debt: number;

  quantity?: number;
  not_paid?: boolean;
  payment_type?: string;
  paid_amount?: number;
}
