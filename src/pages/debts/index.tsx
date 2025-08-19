import { useEffect, useState } from "react";
import Header from "../../components/header";
import DebtsTable from "./debtsTable";
import Notify from "../../components/toast";
import customServerRequest from "../../components/customFetch";
import type { DebtsPageTableProps } from "../../components/types";
import Spinner from "../../components/spinner";
import type { PayDebtProps } from "./types";
import DebtsPayModal from "./debtsPayModal";
import SearchBar from "../../components/searchBar";

const initialPayDebt = {
  purchase_id: 0,
  amount: 0,
};

const Depts = () => {
  const [tableData, setTableData] = useState<DebtsPageTableProps[]>([]);
  const [loader, setLoader] = useState(false);
  const [payDebt, setPayDebt] = useState<PayDebtProps>(initialPayDebt);
  const [debtAmountModal, setDebtAmountModal] = useState(false);
  const [paidRefresh, setPaidRefresh] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [searchedText, setSearchedText] = useState("");

  /* DEBTS FETCH */
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoader(true);
        /* SERVER REQUEST */
        const response = await customServerRequest(`debtors/?page=${page}`);

        /* HTTP ERROR HANDLE */
        if (Number(response.status.toString()[0]) !== 2) throw response;

        const data = await response.json();
        if (data.results.length === 0 && data.count === 0)
          throw new Error("Запись не найдено");

        /* SUCCESS */
        setTotalCount(data.count);
        setTableData(
          data.results.map((el: DebtsPageTableProps) => ({ ...el, key: el.id }))
        );
        Notify("Долги Успешно Получены", "success");
      } catch (error: any) {
        Notify("DEBTS FETCH ERROR", "error");
        setTableData([]);
        console.error("DEBTS FETCH ERROR: ", error);
      } finally {
        setLoader(false);
      }
    };

    fetchTableData();
  }, [paidRefresh, page]);

  /* paying debt */
  const handlePayClick = async () => {
    try {
      setLoader(true);
      /* SERVER REQUEST */
      const response = await customServerRequest(`pay_debt/`, "POST", payDebt);

      /* HTTP ERROR HANDLE */
      if (Number(response.status.toString()[0]) !== 2) throw response;

      /* SUCCESS */
      Notify("Долг был успешно оплачен", "success");
      setDebtAmountModal(false);
      setPayDebt({ ...initialPayDebt });
    } catch (error: any) {
      Notify("DEBT PAY ERROR", "error");
      console.error("DEBT PAY ERROR: ", error);
    } finally {
      setLoader(false);
      setPaidRefresh((p) => p + 1);
    }
  };

  /* handle payDebt change */
  const handlePayDebtChange = (key: string, value: number) => {
    setPayDebt((p) => ({ ...p, [key]: value }));
  };

  /* finding items based on searched keywords */
  const handleSearch = async () => {
    try {
      setLoader(true);

      /* SERVER REQUEST */
      const response = await customServerRequest(
        `debtors/?search=${searchedText}&page=${1}`
      );

      /* HTTP ERROR HANDLE */
      if (Number(response.status.toString()[0]) !== 2) throw response;

      const data = await response.json();
      if (data.results.length === 0 && data.count === 0)
        throw new Error("Запись не найдено");

      /* SUCCESS */
      setTotalCount(data.count);
      setTableData(
        data.results.map((el: DebtsPageTableProps) => ({ ...el, key: el.id }))
      );
      Notify("Поиск Данных Успешно Сделано", "success");
    } catch (error: any) {
      Notify(error?.message || "SEARCHED PRODUCTS FETCH ERROR", "error");
      setTableData([]);
      console.error("SEARCHED PRODUCTS FETCH ERROR: ", error);
    } finally {
      setLoader(false);
    }
  };

  /* Enter press */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="pl-[150px]">
      {loader ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <h1 className="text-3xl font-bold text-default-text pt-10 pl-10">
            Долги
          </h1>

          <div className="mt-4 ml-10 mr-20">
            <SearchBar
              searchedText={searchedText}
              setSearchedText={setSearchedText}
              handleSearch={handleSearch}
              placeholder="Поиск по имени и телефону клиента (нажмите ENTER)"
              onKeyDown={handleKeyDown}
            />
          </div>

          <DebtsTable
            tableData={tableData}
            handlePayBtnClick={(record: DebtsPageTableProps) => {
              setDebtAmountModal(true);
              handlePayDebtChange("purchase_id", record.id);
            }}
            totalCount={totalCount}
            page={page}
            setPage={setPage}
          />

          {debtAmountModal && (
            <DebtsPayModal
              payDebt={payDebt}
              debtAmountModal={debtAmountModal}
              handlePayClick={handlePayClick}
              setDebtAmountModal={setDebtAmountModal}
              handlePayDebtChange={handlePayDebtChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Depts;
