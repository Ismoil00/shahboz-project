export interface HomeTableProps {
  totalCount: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}