import { Table } from "antd";
import type { HomePageTableProps, ProductProps } from "../../components/types";
import { HomePageTableColumns } from "../../assets/homePageTableColumns";
import { useEffect, useState } from "react";
import Notify from "../../components/toast";
import customServerRequest from "../../components/customFetch";
import { useContext } from "react";
import { GlobalStates } from "../../globalStates";
import MoreDetailsModal from "../goods/moreDetailsModal";

interface HomeTableProps {
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

function HomeTable({ setLoader }: HomeTableProps) {
  const { homePageTable, setHomePageTable } = useContext(GlobalStates);
  const [toDisplayProduct, setToDisplayProduct] = useState<ProductProps>(
    {} as ProductProps
  );
  const [modalOpen, setModalOpen] = useState(false);

  /* row click */
  const handleRowClick = (data: ProductProps) => {
    setToDisplayProduct({ ...data });
    setModalOpen(true);
  };

  /* we fetch random products */
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoader(true);

        /* SERVER REQUEST */
        const response = await customServerRequest("products");

        /* HTTP ERROR HANDLE */
        if (response.status !== 200) throw response;

        const data = await response.json();
        setHomePageTable(
          data.map((el: ProductProps) => ({ ...el, key: el.id }))
        );

        /* SUCCESS */
        Notify("Данные Успешно Получены", "success");
      } catch (error: any) {
        Notify(error?.message || `HOME PAGE TABLE DATA FETCH ERROR`, "error");
        console.error("HOME PAGE TABLE DATA FETCH ERROR: ", error);
      } finally {
        setLoader(false);
      }
    };

    if (homePageTable.length === 0) fetchTableData();
  }, []);

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
