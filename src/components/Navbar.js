import { GiHamburgerMenu } from "react-icons/gi";
import { FaBell } from "react-icons/fa";
import CustomeDrawer from "./CustomeDrawer";

const Navbar = ({ handleToggleMenu, setSearch, search, hideInput, linkType }) => {
  return (
    <>
      <nav className="w-full mb-[20px] border rounded-xl bg-slate-600 px-8 flex justify-between items-center shadow-lg z-20 mobile:h-17 md:h-19 lg:h-20">
        <GiHamburgerMenu
          className="text-2xl block lg:hidden"
          onClick={handleToggleMenu}
        />
        <div className="text-white text-2xl font-semibold mobile:text-[20px] modile:leading-[28px] md:text-2xl">
          {linkType}
        </div>
        {hideInput ? (
          " "
        ) : (
          <input
            type="text"
            className="w-[50%] p-3 rounded-md h-10 focus:ring-blue-400 focus:outline-none focus:ring-2 mobile:h-8 md:h-9 lg:h-10"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        )}
        <div className="flex justify-center items-center gap-8">
          <FaBell className="text-xl cursor-pointer" />
          <CustomeDrawer/>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
