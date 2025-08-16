import { useState } from "react";
import Header from "../../components/header";
import Button from "../../components/button";
import customServerRequest from "../../components/customFetch";
import Notify from "../../components/toast";
import Spinner from "../../components/spinner";
import type { PartnerProps } from "./types";
import PartnersList from "./partnersList";

function Calculator() {
  const [loader, setLoader] = useState(false);
  const [partners, setPartners] = useState<PartnerProps[]>([
    {
      id: 1,
      amount: 100,
      fullname: "testov test testovich",
    },
  ]);

  const handleCalculation = async () => {
    try {
      setLoader(true);
      /* SERVER REQUEST */
      const response = await customServerRequest(``);

      /* HTTP ERROR HANDLE */
      if (Number(response.status.toString()[0]) !== 2) throw response;

      const data = await response.json();
      // if (data.results.length === 0 && data.count === 0)
      //   throw new Error("Запись не найдено");

      /* SUCCESS */
      Notify("Расчет прошел успешно", "success");
    } catch (error: any) {
      Notify("CALCULATION ERROR", "error");
      console.error("CALCULATION ERROR: ", error);
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
          <h1 className="text-3xl font-bold text-default-text pt-10 pl-10">
            Калькулятор
          </h1>

          <PartnersList partners={partners} setPartners={setPartners} />

          <div className="grid place-content-center mt-10">
            <Button
              text="Постичать"
              onClick={handleCalculation}
              tailwindUtilities="w-[150px]! hover:bg-hover-text! px-0! py-2!"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Calculator;
