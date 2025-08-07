import { Table } from "antd";
import type { DebtsPageTableProps } from "../../components/types";
import { DebtPageTableColumns } from "../../assets/debtsPageTableColumns";
import { useEffect, useState } from "react";
import Notify from "../../components/toast";

function DebtsTable() {
  const [tableData, setTableData] = useState<DebtsPageTableProps[]>([
    {
      key: 1,
      phone_number: 123456789,
      customer_fullname: "testov test testovich",
      purchased_products: ["shampoo", "soap", "condum"],
      purchased_date: "01-01-2025",
      total_price: 500,
      left_price: 255,
    },
    {
      key: 2,
      phone_number: 123456789,
      customer_fullname: "testov test testovich",
      purchased_products: ["shampoo", "soap", "condum"],
      purchased_date: "01-01-2025",
      total_price: 500,
      left_price: 255,
    },
    {
      key: 3,
      phone_number: 123456789,
      customer_fullname: "testov test testovich",
      purchased_products: ["shampoo", "soap", "condum"],
      purchased_date: "01-01-2025",
      total_price: 500,
      left_price: 255,
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
      <Table<DebtsPageTableProps>
        columns={DebtPageTableColumns}
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

export default DebtsTable;
