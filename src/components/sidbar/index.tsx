// import { useState } from "react";
// import { IoMenu } from "react-icons/io5";
// import { FaChevronLeft } from "react-icons/fa";
import SidebarListItems from "./sidebar";
// import Logout from "../logout";

export default function Sidebar() {
  // const [open, setOpen] = useState<boolean>(true);

  return (
    <>
      {/* LAPTOP + PC VERSIONS */}
      <div className="hidden sm:block w-[150px] bg-bg min-h-screen fixed top-0 left-0 z-10">
        <SidebarListItems version="desktop" />
      </div>

      {/* MOBILE VERSION */}
      {/* <div
        className={`block sm:hidden w-44 h-screen fixed z-50 ${
          open
            ? "animate-openSidebarIconAnimation"
            : "animate-closeSidebarIconAnimation"
        }`}
      >
        <IoMenu
          onClick={() => setOpen(true)}
          className={`${
            open ? "hidden" : "block"
          } absolute top-1 right-1 z-10 size-8 text-brand_blue cursor-pointer`}
        />
        <FaChevronLeft
          onClick={() => setOpen(false)}
          className={`${
            open ? "block" : "hidden"
          } absolute top-2 right-2 z-10 size-6 text-brand_text_secondary cursor-pointer`}
        />
        <div
          className={`flex flex-col pt-10 gap-10 px-3 bg-brand_gray shadow-xl absolute w-full h-full ${
            open
              ? "animate-openSidebarAnimation"
              : "animate-closeSidebarAnimation"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center gap-2 cursor-pointer group/profile relative">
            <span className="w-[15px] h-[15px] bg-brand_green rounded-full absolute left-0 translate-x-[260%] ring-4 ring-brand_gray"></span>
            <img
              src="assets/person-02.png"
              alt="User Profile Image"
              className="w-[60px] h-[70px] rounded-16px object-cover object-center group-hover/profile:shadow-custom-sm transition duration-200"
            />
            <h2 className="font-700 text-brand_text_primary group-hover/profile:text-brand_text_primary/60 transition duration-200 text-center">
              {"Екатерина Варнава"}
            </h2>
          </div>
          <SidebarListItems version="mobile" />
          <div className="flex-1 flex flex-col justify-end pb-10">
            <Logout />
          </div>
        </div>
      </div> */}
    </>
  );
}
