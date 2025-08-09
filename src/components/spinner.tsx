import { Spin } from "antd";

const Spinner = () => (
  <div className="fixed w-screen h-screen flex-col gap-5 grid place-content-center">
    <Spin size="large" className="text-primary" />
    <span className="text-primary">Загружается</span>
  </div>
);

export default Spinner;
