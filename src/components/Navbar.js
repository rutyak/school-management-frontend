import { GiHamburgerMenu } from "react-icons/gi";
import { FaBell } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import CustomeDrawer from "./CustomeDrawer";

const Navbar = ({
  handleToggleMenu,
  setSearch,
  search,
  hideInput,
  linkType,
}) => {
  return (
    <>
      <nav className="w-full mb-[20px] border rounded-xl bg-white px-8 shadow-lg z-20 mobile:px-3 mobile:flex mobile:gap-4 mobile:items-center mobile:rounded-none mobile:py-2 mobile:h-17 md:h-19 lg:mb-[11px] lg:h-20 xl:mb-[20px] xl:px-8 xl:rounded-xl">
        <GiHamburgerMenu
          className="text-2xl block mobile:text-2xl xl:hidden"
          onClick={handleToggleMenu}
        />
        <div className="w-full flex justify-between items-center">
          <div className="text-black text-3xl font-bold mobile:text-[18px] modile:leading-[24px] md:text-2xl">
            {linkType.toUpperCase()}
          </div>

        {hideInput ? (
          <div className="hidden"></div>
        ) : (
          <div className="relative w-[60%] mobile:w-[75%] sm:w-[70%] md:w-[65%] lg:w-[60%]">
            <FiSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-blue-400 focus:outline-none focus:ring-2 mobile:h-8 md:h-9 lg:h-10"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        )}
          <div className="flex justify-center items-center gap-4 hidden sm:flex">
            <FaBell className="text-xl cursor-pointer" />
            <CustomeDrawer />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
