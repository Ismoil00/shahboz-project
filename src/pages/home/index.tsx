import { useState } from "react";
import Header from "../../components/header";
import HomeTable from "./homeTable";
import Spinner from "../../components/spinner";

const Home = () => {
  const [loader, setLoader] = useState(false);

  return (
    <div>
      {loader ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <h1 className="text-3xl font-bold text-default-text pt-10 pl-10">
            Главная
          </h1>
          <HomeTable setLoader={setLoader} />
        </>
      )}
    </div>
  );
};

export default Home;
