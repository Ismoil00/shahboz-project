export interface SalesProps {
  purchase_id: number;
  seller: string;
  product_name: string;
  total_quantity: number;
  total_price: number;
  sold: string;
}

export interface PurchaseProps {
  sales: SalesProps[];
  total_price: number;
}