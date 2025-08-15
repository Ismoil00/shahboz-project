import { useEffect, useState } from "react";
import customServerRequest from "../../components/customFetch";
import Notify from "../../components/toast";
import Spinner from "../../components/spinner";
import Header from "../../components/header";
import { Table } from "antd";
import type { MenuProps, TableProps } from "antd";
import Dropdwn from "../../components/dropdown";
import { IoTodayOutline } from "react-icons/io5";
import { BsCalendarWeek } from "react-icons/bs";
import { MdCalendarMonth } from "react-icons/md";

interface SalesProps {
  product__name: string;
  total_quantity: number;
  total_price: number;
  sold_at: string;
}

interface PurchaseProps {
  sales: SalesProps[];
  start_date: string;
  end_date: string;
  total_price: number;
}

export const SalesTableColumns: TableProps<SalesProps>["columns"] = [
  {
    key: "row_number",
    title: "№",
    render: (record) => <span>{record.key}</span>,
  },
  {
    key: "product__name",
    dataIndex: "product__name",
    title: "Название",
  },

  {
    key: "product__name",
    dataIndex: "product__name",
    title: "Название",
  },
  {
    key: "total_quantity",
    dataIndex: "total_quantity",
    title: "Продано в количестве",
  },
  {
    key: "saler",
    dataIndex: "saler",
    title: "Продавец",
  },
  {
    key: "total_price",
    dataIndex: "total_price",
    title: "Сумма",
  },
  {
    key: "sold_at",
    dataIndex: "sold_at",
    title: "Проданно",
  },
];

export const salesPageDropdownItems: MenuProps["items"] = [
  {
    key: "daily",
    label: <p className="ml-2">За сегодня</p>,
    icon: <IoTodayOutline className="scale-200 text-default-text" />,
  },
  {
    key: "weekly",
    label: <p className="ml-2">За неделю</p>,
    icon: <BsCalendarWeek className="scale-180 text-default-text" />,
  },
  {
    key: "monthly",
    label: <p className="ml-2">За месяц</p>,
    icon: <MdCalendarMonth className="scale-210 text-default-text" />,
  },
];

function Sales() {
  const [loader, setLoader] = useState(false);
  const [purchase, setPurchase] = useState<PurchaseProps>({} as PurchaseProps);
  const [chosenPeriod, setChosenPeriod] = useState("");

  /* we fetch random products */
  // useEffect(() => {
  //   const fetchTableData = async () => {
  //     try {
  //       setLoader(true);

  //       /* SERVER REQUEST */
  //       const response = await customServerRequest("purchase/");

  //       /* HTTP ERROR HANDLE */
  //       if (response.status !== 200) throw response;

  //       const data = await response.json();

  //       // console.log("response", response);
  //       console.log("DATA", data);

  //       /* SUCCESS */
  //       Notify("Данные Успешно Получены", "success");
  //     } catch (error: any) {
  //       Notify(error?.message || `HOME PAGE TABLE DATA FETCH ERROR`, "error");
  //       console.error("HOME PAGE TABLE DATA FETCH ERROR: ", error);
  //     } finally {
  //       setLoader(false);
  //     }
  //   };

  //   if (!purchase.sales) fetchTableData();
  // }, []);

  const handleDropdownSelection = async (key: string) => {
    try {
      setLoader(true);

      /* SERVER REQUEST */
      const response = await customServerRequest(`purchase/${key}/`);

      /* HTTP ERROR HANDLE */
      if (response.status !== 200) throw response;

      const data = await response.json();
      if (data.total_price === 0 && data.sales.length === 0)
        throw new Error("Запись не найдено");

      // console.log("response", response);
      // console.log("DATA", data);

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
              <h2 className="text-default-text mb-2">{`С ${purchase.start_date} по ${purchase.end_date} было продано ${purchase.total_price} сомонӣ`}</h2>
            )}
            <Table<SalesProps>
              columns={SalesTableColumns}
              dataSource={purchase.sales}
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
