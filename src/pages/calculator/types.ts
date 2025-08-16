export interface PartnerProps {
  id: string | number;
  amount: number;
  fullname: string;
}

export interface PartnersListProps {
  partners: PartnerProps[];
  setPartners: React.Dispatch<React.SetStateAction<PartnerProps[]>>
}
