import { Table } from "antd";
import type {
  HomePageTableProps,
  HomePageReques,
} from "../../components/types";
import { HomePageTableColumns } from "../../assets/homePageTableColumns";
import { useEffect } from "react";
import Notify from "../../components/toast";
import customServerRequest from "../../components/customFetch";
import { useContext } from "react";
import { GlobalStates } from "../../globalStates";

function HomeTable() {
  const { homePageTable, setHomePageTable } = useContext(GlobalStates);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        /* SERVER REQUEST */
        const response = await customServerRequest("products");

        /* HTTP ERROR HANDLE */
        if (response.status !== 200) throw response;

        const data = await response.json();
        setHomePageTable(
          data.map((el: HomePageReques) => ({ ...el, key: el.id }))
        );

        /* SUCCESS */
        Notify("Данные Успешно Получены", "success");
      } catch (error: any) {
        Notify(error?.message || `HOME PAGE TABLE DATA FETCH ERROR`, "error");
        console.error("HOME PAGE TABLE DATA FETCH ERROR: ", error);
      }
    };

    if (homePageTable.length === 0) fetchTableData();
  }, []);

  return (
    <div className="w-full px-10 pt-10">
      <Table<HomePageTableProps>
        columns={HomePageTableColumns}
        dataSource={homePageTable}
        className="homePageTableHeader"
        onRow={() => ({
          style: { backgroundColor: "#fafafa", color: "#003A6B" },
        })}
        locale={{
          emptyText: "Нет данных",
        }}
      />
    </div>
  );
}

export default HomeTable;
