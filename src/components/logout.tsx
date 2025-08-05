import { useNavigate } from "react-router-dom";
import Notify from "./toast";
import { useContext } from "react";
import { GlobalStates } from "../globalStates";

const Logout = () => {
  const { session } = useContext(GlobalStates);
  const navigate = useNavigate();

  const handleLogout = async () => {
    // const formData = new FormData();
    // formData.append("refresh_token", session.refresh_token);

    console.log("REFRESH TOKEN", session.refresh_token);
    console.log("ACCESS TOKEN", "Bearer " + session.access_token);

    try {
      /* SERVER REQUEST */
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/logout/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: "Bearer " + session.access_token,
          },
          // body: formData,
          body: JSON.stringify({ refresh_token: session.refresh_token }),
        }
      );
      const data = await response.json();

      /* HTTP ERROR HANDLE */
      if (response.status !== 200) throw data;

      /* SUCCESS -> NAVIGATE TO HOME-PAGE */
      localStorage.removeItem("session");
      Notify("You logged out", "info");
      navigate("/login");
    } catch (error: any) {
      Notify(error?.message || `LOGOUT ERROR`, "error");
      console.error("LOGOUT ERROR: ", error);
    }
  };

  return (
    <button className="cursor-pointer" onClick={handleLogout}>
      Выход
    </button>
  );
};

export default Logout;
