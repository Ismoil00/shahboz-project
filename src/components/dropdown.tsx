import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import type { DropdownProps } from "./types";
import { useState } from "react";

const Dropdwn = ({
  text,
  items,
  dropdownTailwindcss,
  getChosenDropdownElement,
  multiSelection = true,
  defaultValue = "",
}: DropdownProps) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Dropdown
      className={`text-default-text cursor-pointer ${dropdownTailwindcss}`}
      menu={{
        items,
        onClick: (e) => {
          if (!getChosenDropdownElement) return;
          getChosenDropdownElement(e.key);
          setSelectedKeys((p) => {
            if (!multiSelection) return [e.key];

            const keys = new Set(p);
            if (keys.has(e.key)) keys.delete(e.key);
            else keys.add(e.key);
            return Array.from(keys);
          });
        },
        selectedKeys: [...selectedKeys, defaultValue || ""],
      }}
    >
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
