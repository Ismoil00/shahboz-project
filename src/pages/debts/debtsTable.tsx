import { Table } from "antd";
import type { DebtsPageTableProps } from "../../components/types";
import { DebtPageTableColumns } from "../../assets/debtsPageTableColumns";

interface DebtsTableProps {
  tableData: DebtsPageTableProps[];
}

function DebtsTable({ tableData }: DebtsTableProps) {
  return (
    <div className="w-full px-10 pt-10">
      <Table<DebtsPageTableProps>
        columns={DebtPageTableColumns}
        dataSource={tableData}
        className="homePageTableHeader"
        onRow={() => ({
          style: { backgroundColor: "#fafafa", color: "#003A6B" },
        })}
        locale={{
          emptyText: "Нет данных",
        }}
      />
    </div>
  );
}

export default DebtsTable;
