import type { UserSession } from "../../globalTypes";
import Dropdwn from "../dropdown";
import { items } from "../../assets/headerItems";

const Header = () => {
  const session: UserSession = JSON.parse(
    localStorage.getItem("session") as string
  );
  // console.log("SESSION", session);

  return (
    <div className="flex justify-end items-center gap-5 px-5 py-2 border-b-1 border-b-primary/10">
      <img
        src={`/public/logo.png`}
        alt="Image Profile"
        className="w-10 h-10 rounded-full"
      />
      <Dropdwn text={session.name} items={{ items }} />
    </div>
  );
};

export default Header;
