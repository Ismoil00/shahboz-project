import { Table } from "antd";
import type { HomePageTableProps } from "./types";
import { HomePageTableColumns } from "../assets/homePageTableColumns";
import { useEffect, useState } from "react";
import Notify from "./toast";

function HomeTable() {
  const [tableData, setTableData] = useState<HomePageTableProps[]>([
    {
      key: 1,
      product_code: 10,
      product_name: "new product",
      product_price: 10,
      product_affordable_quantity: 10,
    },
    {
      key: 2,
      product_code: 10,
      product_name: "new product",
      product_price: 10,
      product_affordable_quantity: 10,
    },
    {
      key: 3,
      product_code: 10,
      product_name: "new product",
      product_price: 10,
      product_affordable_quantity: 10,
    },
  ]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        /* SERVER REQUEST */
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/products/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        const data = await response.json();

        /* HTTP ERROR HANDLE */
        if (response.status !== 200) throw data;

        /* SUCCESS */
        Notify("Данные Успешно Получены", "success");
      } catch (error: any) {
        Notify(error?.message || `HOME PAGE TABLE DATA FETCH ERROR`, "error");
        console.error("HOME PAGE TABLE DATA FETCH ERROR: ", error);
      }
    };

    if (tableData.length === 0) fetchTableData();
  }, []);

  return (
    <div className="w-full px-10 pt-10">
      <Table<HomePageTableProps>
        columns={HomePageTableColumns}
        dataSource={tableData}
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
