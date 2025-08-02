import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import type { DropdownProps } from "./types";

const Dropdwn = ({ text, items }: DropdownProps) => {
  return (
    <Dropdown className="text-default-text cursor-pointer" menu={items}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {text}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default Dropdwn;
