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
    <div className="w-[100vw] h-[100vh] overflow-auto scrollbar flex flex-col md:flex-row bg-slate-300 sm:bg-white md:bg-slate-300">
      <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
      <div className="flex-1 m-5 ml-0 mobile:mt-0 mobile:w-[100%] sm:w-[100%] md:mr-0 lg:w-full xl:ml-[17%] xl:m-5 xl:w-[85.5%]">
        <Navbar handleToggleMenu={handleToggleMenu} setSearch={setSearch} search={search} hideInput={hideInput} linkType={linkType}/>
        <Outlet context={{search, setSearch, setHideInput, setLinkType}}/>
      </div>
    </div>
  );
};

export default Main;
