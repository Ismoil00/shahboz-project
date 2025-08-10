// import type { InputNumberProps } from "antd";
import { InputNumber } from "antd";

// const onChange: InputNumberProps["onChange"] = (value) => {
//   console.log("changed", value);
// };

interface InputNumberProps {
  min: number;
  value?: number;
  onChange: (value: number) => void;
  max?: number;
}

const InputNum = ({
  min,
  value,
  onChange,
  max = Infinity,
}: InputNumberProps) => (
  <InputNumber
    min={min}
    max={max}
    value={value}
    onChange={(e) => {
      if (!e || e < 1) return;
      onChange(e || 0);
    }}
    changeOnWheel
  />
);

export default InputNum;
