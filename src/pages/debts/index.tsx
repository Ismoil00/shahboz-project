import Header from "../../components/header";
import DebtsTable from "./debtsTable";

const Depts = () => {
  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold text-default-text pt-10 pl-10">
        Долги
      </h1>
      <DebtsTable />
    </div>
  );
};

export default Depts;
