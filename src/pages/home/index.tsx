import { useContext, useEffect, useState } from "react";
import Header from "../../components/header";
import HomeTable from "./homeTable";
import Spinner from "../../components/spinner";
import Notify from "../../components/toast";
import customServerRequest from "../../components/customFetch";
import { GlobalStates } from "../../globalStates";
import type { ProductProps } from "../../components/types";

const Home = () => {
  const [loader, setLoader] = useState(false);
  const { setHomePageTable } = useContext(GlobalStates);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        /* SERVER REQUEST */
        const response = await customServerRequest(`products/?page=${page}`);

        /* HTTP ERROR HANDLE */
        if (Number(response.status.toString()[0]) !== 2) throw response;

        const data = await response.json();
        setTotalCount(data.count);
        setHomePageTable(
          data.results.map((el: ProductProps) => ({ ...el, key: el.id }))
        );

        /* SUCCESS */
        Notify("Данные Успешно Получены", "success");
      } catch (error: any) {
        Notify(error?.message || `HOME PAGE TABLE DATA FETCH ERROR`, "error");
        console.error("HOME PAGE TABLE DATA FETCH ERROR: ", error);
      } finally {
        setLoader(false);
      }
    };

    setLoader(true);
    fetchTableData();
  }, [page]);

  return (
    <div className="pl-[150px]">
      {loader ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <h1 className="text-3xl font-bold text-default-text pt-10 pl-10">
            Главная
          </h1>
          <HomeTable totalCount={totalCount} page={page} setPage={setPage} />
        </>
      )}
    </div>
  );
};

export default Home;
