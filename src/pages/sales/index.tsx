import { useState } from "react";
import customServerRequest from "../../components/customFetch";
import Notify from "../../components/toast";
import Spinner from "../../components/spinner";
import Header from "../../components/header";
import { Table } from "antd";
import Dropdwn from "../../components/dropdown";
import type { SalesProps, PurchaseProps } from "./types";
import {
  SalesTableColumns,
  salesPageDropdownItems,
} from "../../assets/salesPageData";

function Sales() {
  const [loader, setLoader] = useState(false);
  const [purchase, setPurchase] = useState<PurchaseProps>({} as PurchaseProps);
  const [chosenPeriod, setChosenPeriod] = useState("");

  const handleDropdownSelection = async (key: string) => {
    try {
      setLoader(true);

      /* SERVER REQUEST */
      const response = await customServerRequest(`purchase/${key}/`);

      /* HTTP ERROR HANDLE */
      if (Number(response.status.toString()[0]) !== 2) throw response;

      const data = await response.json();
      if (data.total_price === 0 && data.sales.length === 0)
        throw new Error("Запись не найдено");

      /* SUCCESS */
      Notify("Данные Успешно Получены", "success");
      setPurchase({
        ...data,
        sales: data.sales.map((el: SalesProps, index: number) => ({
          ...el,
          key: index + 1,
        })),
      });
    } catch (error: any) {
      Notify(error?.message || `HOME PAGE TABLE DATA FETCH ERROR`, "error");
      console.error("HOME PAGE TABLE DATA FETCH ERROR: ", error);
      setPurchase({} as PurchaseProps);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="pl-[150px]">
      {loader ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <h1 className="text-3xl font-bold text-default-text pt-5 pl-10">
            Продажи
          </h1>

          <div className="mt-10 ml-10">
            <Dropdwn
              text={chosenPeriod || "Период"}
              items={salesPageDropdownItems}
              getChosenDropdownElement={(key) => {
                setChosenPeriod(
                  key === "daily"
                    ? "За сегодня"
                    : key === "weekly"
                    ? "За неделю"
                    : key === "monthly"
                    ? "За месяц"
                    : ""
                );
                handleDropdownSelection(key);
              }}
              dropdownTailwindcss="border-[#003a6b]/10! border-1! py-1! px-2! rounded-sm! hover:bg-[#003a6b]/10! hover:border-[#003a6b]/20! transition! duration-200!"
            />
          </div>

          <div className="w-full px-10 pt-5">
            {purchase.sales && (
              <h2 className="text-default-text mb-2">{`Общая цена: ${purchase.total_price} сомонӣ`}</h2>
            )}
            <Table<SalesProps>
              columns={SalesTableColumns}
              dataSource={purchase.sales}
              className="homePageTableHeader"
              onRow={(_r, _) => ({
                style: {
                  backgroundColor: "#fafafa",
                  color: "#003A6B",
                  cursor: "pointer",
                },
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
