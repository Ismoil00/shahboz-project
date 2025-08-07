import Header from "../../components/header";
import HomeTable from "./homeTable";

const Home = () => {
  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold text-default-text pt-10 pl-10">
        Главная
      </h1>
      <HomeTable />
    </div>
  );
};

export default Home;
