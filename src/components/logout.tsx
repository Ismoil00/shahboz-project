import { useNavigate } from "react-router-dom";
// import type { UserSession } from "../globalTypes";
import Notify from "./toast";
import { useContext } from "react";
import { GlobalStates } from "../globalStates";

const Logout = () => {
  const { session } = useContext(GlobalStates);
  const navigate = useNavigate();
  // const session: UserSession = JSON.parse(
  //   localStorage.getItem("session") as string
  // );

  const handleLogout = async () => {
    console.log({ refresh: session.refresh_token });
    try {
      /* SERVER REQUEST */
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/logout/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ refresh: session.refresh_token }),
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
      Logout
    </button>
  );
};

export default Logout;
