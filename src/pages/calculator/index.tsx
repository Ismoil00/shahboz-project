import { useState } from "react";
import Header from "../../components/header";
import Button from "../../components/button";
import customServerRequest from "../../components/customFetch";
import Notify from "../../components/toast";
import Spinner from "../../components/spinner";
import type { PartnerProps } from "./types";
import PartnersList from "./partnersList";
import type { CalculationResponseType } from "./types";

const initPartner = {
  id: Number(new Date()),
  amount: 0,
  fullname: "",
};

function Calculator() {
  const [loader, setLoader] = useState(false);
  const [partners, setPartners] = useState<PartnerProps[]>([initPartner]);

  const handleCalculation = async () => {
    try {
      setLoader(true);
      /* SERVER REQUEST */
      const response = await customServerRequest(
        `calculate-percentages/`,
        "POST",
        partners
      );

      /* HTTP ERROR HANDLE */
      if (Number(response.status.toString()[0]) !== 2) throw response;

      const data = await response.json();
      if (data.length === 0) throw new Error("Расчет не сделан");

      /* SUCCESS */
      setPartners((p) =>
        data.map((del: CalculationResponseType) => ({
          ...p.find((pel) => del.id === pel.id),
          percent: del.percent,
        }))
      );
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

          <div className="mt-10 flex gap-5 justify-center items-center">
            <Button
              text="Постичать"
              onClick={handleCalculation}
              tailwindUtilities="w-[150px]! hover:bg-hover-text! px-0! py-2!"
            />
            <Button
              text="Очистить все"
              onClick={() => setPartners([initPartner])}
              tailwindUtilities="w-[150px]! hover:bg-secondary/80! px-0! py-2! bg-secondary!"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Calculator;
