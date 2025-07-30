import { toast, type ToastOptions } from "react-toastify";
import { IoIosInformationCircle } from "react-icons/io";
import { TiTick } from "react-icons/ti";

/* 
  brand_white: "#FFFFFF",
  brand_gray: "#F2F2FE",
  brand_blue: "#1e40af",
  brand_orange: "#FFA012",
  brand_green: "#57BB34",
  brand_red: "#FF3B30",
  brand_text_primary: "#4E3F6F",
  brand_text_secondary: "#8C8CB6",
*/
const Notify = (
  message: string | undefined = "No Error Message",
  type: string,
  theme: string = "light"
) => {
  const iconColor = {
    scale: "2.4",
    paddingLeft: "2px",
    color:
      type === "info"
        ? "#1e40af"
        : type === "error"
        ? "#FF3B30"
        : type === "success"
        ? "#57BB34"
        : "",
  };
  const options: ToastOptions<unknown> = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: theme,
    icon:
      type === "info" ? (
        <IoIosInformationCircle style={iconColor} />
      ) : type === "error" ? (
        <IoIosInformationCircle style={iconColor} />
      ) : type === "success" ? (
        <TiTick style={iconColor} />
      ) : undefined,
    className:
      theme === "light" ? "text-brand_text_primary" : "text-brand_white",
    progressClassName:
      type === "info"
        ? "bg-brand_blue"
        : type === "error"
        ? "bg-brand_red"
        : type === "success"
        ? "bg-brand_green"
        : "bg-red-500",
  };

  if (type === "info") toast.info(message, options);
  else if (type === "success") toast.success(message, options);
  else if (type === "error") toast.error(message, options);
};

export default Notify;
