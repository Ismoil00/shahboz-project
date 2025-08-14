import { Table } from "antd";
import type { DebtsPageTableProps } from "../../components/types";
import { GetDebtPageTableColumns } from "../../assets/debtsPageTableColumns";
import type { DebtsTableProps } from "./types";

function DebtsTable({
  tableData,
  handlePayBtnClick,
  totalCount,
  page,
  setPage,
}: DebtsTableProps) {
  return (
    <div className="w-full px-10 pt-10">
      <Table<DebtsPageTableProps>
        columns={GetDebtPageTableColumns(handlePayBtnClick)}
        dataSource={tableData}
        className="homePageTableHeader"
        pagination={{
          current: page,
          pageSize: 10,
          total: totalCount,
          onChange: (page) => setPage(page),
        }}
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
