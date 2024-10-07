import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const Main = () => {
  const [search, setSearch] = useState();
  const [hideInput, setHideInput] = useState();
  const [openMenu, setOpenMenu] = useState(false);
  const [linkType, setLinkType] = useState("Dashboard")

  function handleToggleMenu(){
     setOpenMenu(!openMenu);
  }

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col md:flex-row bg-slate-300">
      <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
      <div className="flex-1 m-5 ml-0 mobile:w-[100%] sm:w-[100%] lg:ml-[10%] lg:w-[90%] xl:ml-[17%] xl:w-[85.5%]">
        <Navbar handleToggleMenu={handleToggleMenu} setSearch={setSearch} search={search} hideInput={hideInput} linkType={linkType}/>
        <Outlet context={{search, setSearch, setHideInput, setLinkType}}/>
      </div>
    </div>
  );
};

export default Main;
