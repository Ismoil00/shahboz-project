import { useNavigate } from "react-router-dom";
import Notify from "./toast";
import { useContext } from "react";
import { GlobalStates } from "../globalStates";
import { emptySession } from "../globalStates";

const Logout = () => {
  const { session, setSession } = useContext(GlobalStates);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const formData = new FormData();
    formData.append("refresh_token", session.refresh_token);

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

      /* HTTP ERROR HANDLE */
      if (response.status !== 205) throw response;

      /* SUCCESS -> NAVIGATE TO HOME-PAGE */
      localStorage.removeItem("session");
      setSession(emptySession);
      Notify("Вы вышли из системы", "info");
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
