import { useEffect, useState } from "react";
import Header from "../../components/header";
import DebtsTable from "./debtsTable";
import Notify from "../../components/toast";
import customServerRequest from "../../components/customFetch";
import type { DebtsPageTableProps } from "../../components/types";
import Spinner from "../../components/spinner";

/* 
{
    "id": 18,
    "user": "john doe",
    "client_name": "ismoil",
    "client_number": 205,
    "product": "Калькулятор инженерный",
    "quantity": 1,
    "not_paid": true,
    "payment_type": "cash",
    "paid_amount": "0.00",
    "remaining_debt": null,
    "total_price": "307.61",
    "sold_at": "2025-08-12T22:31:57.625646+05:00"
}
*/

const Depts = () => {
  const [tableData, setTableData] = useState<DebtsPageTableProps[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoader(true);
        /* SERVER REQUEST */
        const response = await customServerRequest(`debtors/`);

        /* HTTP ERROR HANDLE */
        if (response.status !== 200) throw response;

        const data = await response.json();
        /* ------------------------------------ */
        const newdata: any = [];
        data.forEach((el: any) =>
          el.items.forEach((innerEl: any) =>
            newdata.push({
              ...innerEl,
              key: innerEl.id,
              sold_at: innerEl.sold_at.split("T")[0],
            })
          )
        );
        /* ------------------------------------ */
        console.log("data", data);

        /* SUCCESS */
        Notify("Долги Успешно Получены", "success");
        setTableData(newdata);
      } catch (error: any) {
        Notify("DEBTS FETCH ERROR", "error");
        console.error("DEBTS FETCH ERROR: ", error);
      } finally {
        setLoader(false);
      }
    };

    if (tableData.length === 0) fetchTableData();
  }, []);

  return (
    <div>
      {loader ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <h1 className="text-3xl font-bold text-default-text pt-10 pl-10">
            Долги
          </h1>
          <DebtsTable tableData={tableData} />
        </>
      )}
    </div>
  );
};

export default Depts;
