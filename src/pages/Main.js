import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
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
    <div className="w-screen h-screen overflow-auto bg-gradient-to-r from-blue-500 to-purple-200 flex flex-col xl:flex-row">
      <div className="h-full w-[15%]">
        <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </div>
      <div className="flex-1 xl:m-5">
        <Navbar
          handleToggleMenu={handleToggleMenu}
          setSearch={setSearch}
          search={search}
          hideInput={hideInput}
          linkType={linkType}
        />
        <Outlet context={{ search, setSearch, setHideInput, setLinkType }} />
      </div>
    </div>
  );
};

export default Main;
