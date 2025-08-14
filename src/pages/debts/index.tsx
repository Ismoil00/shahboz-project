import { useEffect, useState } from "react";
import Header from "../../components/header";
import DebtsTable from "./debtsTable";
import Notify from "../../components/toast";
import customServerRequest from "../../components/customFetch";
import type { DebtsPageTableProps } from "../../components/types";
import Spinner from "../../components/spinner";
import type { PayDebtProps } from "./types";
import DebtsPayModal from "./debtsPayModal";

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

  /* DEBTS FETCH */
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        setLoader(true);
        /* SERVER REQUEST */
        const response = await customServerRequest(`debtors/?page=${page}`);

        /* HTTP ERROR HANDLE */
        if (response.status !== 200) throw response;

        /* SUCCESS */
        const data = await response.json();
        setTotalCount(data.count);
        setTableData(
          data.results.map((el: DebtsPageTableProps) => ({ ...el, key: el.id }))
        );
        Notify("Долги Успешно Получены", "success");
      } catch (error: any) {
        Notify("DEBTS FETCH ERROR", "error");
        console.error("DEBTS FETCH ERROR: ", error);
      } finally {
        setLoader(false);
      }
    };

    fetchTableData();
  }, [paidRefresh]);

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
            // <Modal
            //   title="Введите сумму платежа"
            //   open={debtAmountModal}
            //   onCancel={() => setDebtAmountModal(false)}
            //   wrapClassName="more-details-modal"
            //   footer={
            //     <Button text="Оплатить" onClick={handlePayClick}></Button>
            //   }
            // >
            //   <Input
            //     name="amount"
            //     onChange={(e) =>
            //       handlePayDebtChange("amount", Number(e.target.value))
            //     }
            //     placeholder="сумма платижа"
            //     type="number"
            //     value={payDebt.amount}
            //   />
            // </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default Depts;
