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
  setChosenProducts: React.Dispatch<React.SetStateAction<PurchaseProductProps[]>>;
  chosenProductsModal: boolean;
  setChosenProductsModal: React.Dispatch<React.SetStateAction<boolean>>;
}
