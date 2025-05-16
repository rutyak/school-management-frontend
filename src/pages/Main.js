import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { useState } from "react";

const Main = () => {
  const [search, setSearch] = useState();
  const [hideInput, setHideInput] = useState();
  const [openMenu, setOpenMenu] = useState(false);
  const [linkType, setLinkType] = useState("Dashboard");

  function handleToggleMenu() {
    setOpenMenu(!openMenu);
  }

  return (
    <div className="w-screen h-screen overflow-auto bg-gradient-to-r from-blue-500 to-purple-200 flex flex-col xl:flex-row 2xl:max-w-[]">
      <div
        className={`h-full flex-shrink-0 w-[80px] md:max-w-[90px] xl:w-[15%] ${
          openMenu ? "z-10 absolute block" : "hidden"
        } xl:block`}
      >
        <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>
      <div className="flex-1 min-w-0 xl:m-5">
        <Navbar
          handleToggleMenu={handleToggleMenu}
          setSearch={setSearch}
          search={search}
          hideInput={hideInput}
          linkType={linkType}
        />
        <div className="xl:h-[90%] flex-1">
          <Outlet context={{ search, setSearch, setHideInput, setLinkType }} />
        </div>
      </div>
    </div>
  );
};

export default Main;
