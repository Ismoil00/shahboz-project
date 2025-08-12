import { Table } from "antd";
import type { HomePageTableProps, ProductProps } from "../../components/types";
import { HomePageTableColumns } from "../../assets/homePageTableColumns";
import { useState } from "react";
import { useContext } from "react";
import { GlobalStates } from "../../globalStates";
import MoreDetailsModal from "../goods/moreDetailsModal";

interface HomeTableProps {
  totalCount: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function HomeTable({ totalCount, page, setPage }: HomeTableProps) {
  const { homePageTable } = useContext(GlobalStates);
  const [toDisplayProduct, setToDisplayProduct] = useState<ProductProps>(
    {} as ProductProps
  );
  const [modalOpen, setModalOpen] = useState(false);

  /* row click */
  const handleRowClick = (data: ProductProps) => {
    setToDisplayProduct({ ...data });
    setModalOpen(true);
  };

  return (
    <div className="w-full px-10 pt-10">
      {modalOpen && (
        <MoreDetailsModal
          moreDetailsProduct={toDisplayProduct}
          moreDetailsModal={modalOpen}
          setMoreDetailsModal={setModalOpen}
        />
      )}
      <Table<HomePageTableProps>
        columns={HomePageTableColumns}
        dataSource={homePageTable}
        className="homePageTableHeader"
        pagination={{
          current: page,
          pageSize: 10,
          total: totalCount,
          onChange: (page) => setPage(page),
        }}
        onRow={(record, _) => ({
          style: {
            backgroundColor: "#fafafa",
            color: "#003A6B",
            cursor: "pointer",
          },
          onClick: () => {
            const { key, ...rest } = record;
            handleRowClick({ ...rest, id: Number(key) });
          },
        })}
        locale={{
          emptyText: "Нет данных",
        }}
      />
    </div>
  );
}

export default HomeTable;
