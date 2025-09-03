export interface PartnerProps {
  id: string | number;
  amount: number;
  fullname: string;
  percent?: number;
}

export interface PartnersListProps {
  partners: PartnerProps[];
  setPartners: React.Dispatch<React.SetStateAction<PartnerProps[]>>;
}

export interface CalculationResponseType {
  id: string | number;
  amount: number;
  percent: number;
}