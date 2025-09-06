import type {
  ProductProps,
  PurchaseProductProps,
} from "../../components/types";

export interface MoreDetailsModalProps {
  moreDetailsProduct: ProductProps;
  moreDetailsModal: boolean;
  setMoreDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProductComponentProps {
  product: ProductProps;
  isChosen: boolean;
  setChosenProducts: React.Dispatch<
    React.SetStateAction<PurchaseProductProps[]>
  >;
  setMoreDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMoreDetailsProduct: React.Dispatch<React.SetStateAction<ProductProps>>;
}

export interface ChosenProductsModalProps {
  chosenProducts: PurchaseProductProps[];
  setChosenProducts: React.Dispatch<
    React.SetStateAction<PurchaseProductProps[]>
  >;
  chosenProductsModal: boolean;
  setChosenProductsModal: React.Dispatch<React.SetStateAction<boolean>>;
  handlePurchaseSave: () => Promise<void>;
}

export interface PurchaseProps {
  user: number;
  client_name: string;
  client_number: number;
  product: number;
  product_name: string;
  quantity: number;
  not_paid: boolean;
  payment_type: "cash" | "non-cash";
  total_price: string | number;
  paid_amount: string | number;
}

export interface PurchaseSuccessInfoProps {
  total_purchase: number;
  purchases: PurchaseProps[];
}

export interface SuccessPurchaseModalProps {
  purchaseSuccessModal: boolean;
  purchaseSuccessInfo: PurchaseSuccessInfoProps;
  setPurchaseSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}
