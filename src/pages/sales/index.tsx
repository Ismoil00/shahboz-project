import { useEffect, useState } from "react";
import customServerRequest from "../../components/customFetch";
import Notify from "../../components/toast";
import Spinner from "../../components/spinner";
import Header from "../../components/header";
import { Table } from "antd";
import type { TableProps } from "antd";

/* 
[
    {
        "items": [
            {
                "id": 2,
                "user": "john doe",
                "client_name": "исмоил",
                "client_number": 918225547,
                "product": "Настольная лампа",
                "quantity": 1,
                "not_paid": true,
                "payment_type": "cash",
                "paid_amount": "0.00",
                "remaining_debt": null,
                "total_price": "33.11",
                "sold_at": "2025-08-11T21:42:56.473049+05:00"
            }
        ]
    },
    {
        "items": [
            {
                "id": 1,
                "user": "john doe",
                "client_name": "",
                "client_number": 918225547,
                "product": "Блокнот А5",
                "quantity": 1,
                "not_paid": false,
                "payment_type": "cash",
                "paid_amount": "0.00",
                "remaining_debt": null,
                "total_price": "65.01",
                "sold_at": "2025-08-11T21:42:56.468284+05:00"
            }
        ]
    }
]
*/

interface PurchaseProps {
  // id: 2;
  // user: "john doe";
  // client_name: "исмоил";
  // client_number: 918225547;
  // product: "Настольная лампа";
  // quantity: 1;
  // not_paid: true;
  // payment_type: "cash";
  // paid_amount: "0.00";
  // remaining_debt: null;
  // total_price: "33.11";
  // sold_at: "2025-08-11T21:42:56.473049+05:00";
}

export const SalesTableColumns: TableProps<PurchaseProps>["columns"] = [
  {
    key: "product",
    dataIndex: "product",
    title: "Название",
  },
  {
    key: "sold-out",
    dataIndex: "sold-out",
    title: "Продано в количестве",
  },
  {
    key: "saler",
    dataIndex: "saler",
    title: "Продавец",
  },
  {
    key: "sum",
    dataIndex: "sum",
    title: "Сумма",
  },
];

function Sales() {
  const [loader, setLoader] = useState(false);
  const [purchases, setPurchases] = useState<PurchaseProps[]>([]);

  /* we fetch random products */
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoader(true);

        /* SERVER REQUEST */
        const response = await customServerRequest("purchase/");

        /* HTTP ERROR HANDLE */
        if (response.status !== 200) throw response;

        const data = await response.json();

        // console.log("response", response);
        // console.log("DATA", data);

        /* SUCCESS */
        Notify("Данные Успешно Получены", "success");
      } catch (error: any) {
        Notify(error?.message || `HOME PAGE TABLE DATA FETCH ERROR`, "error");
        console.error("HOME PAGE TABLE DATA FETCH ERROR: ", error);
      } finally {
        setLoader(false);
      }
    };

    // if (purchases.length === 0) fetchTableData();
  }, []);
  return (
    <div className="pl-[150px]">
      {loader ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <h1 className="text-3xl font-bold text-default-text pt-10 pl-10">
            Продажи
          </h1>
          <div className="w-full px-10 pt-10">
            <Table<PurchaseProps>
              columns={SalesTableColumns}
              dataSource={purchases}
              className="homePageTableHeader"
              onRow={(record, _) => ({
                style: {
                  backgroundColor: "#fafafa",
                  color: "#003A6B",
                  cursor: "pointer",
                },
                // onClick: () => {
                //   const { key, ...rest } = record;
                //   handleRowClick({ ...rest, id: Number(key) });
                // },
              })}
              locale={{
                emptyText: "Нет данных",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Sales;
