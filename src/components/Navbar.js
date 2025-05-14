import { GiHamburgerMenu } from "react-icons/gi";
import { FaBell } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import CustomeDrawer from "../pages/drawer/CustomeDrawer";

const Navbar = ({ handleToggleMenu, setSearch, search, hideInput, linkType }) => {
  return (
    <nav className="flex-1 bg-white xl:rounded-xl shadow-md border px-6 py-4 flex items-center justify-between z-20 
      md:h-18 lg:h-20 transition-all duration-300">
      
      <div className="flex items-center gap-4">
        <GiHamburgerMenu
          className="text-3xl text-gray-700 cursor-pointer hover:text-blue-500 xl:hidden"
          onClick={handleToggleMenu}
        />
        <h1 className="text-2xl font-semibold text-gray-800 md:text-xl tracking-wide">
          {linkType.toUpperCase()}
        </h1>
      </div>

      {!hideInput && (
        <div className="relative w-[60%] xl:w-[50%]">
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 text-sm md:text-base shadow-sm"
          />
        </div>
      )}

      <div className="hidden sm:flex items-center gap-5">
        <div className="relative cursor-pointer">
          <FaBell className="text-xl text-gray-600 hover:text-blue-500 transition" />
          <span className="absolute top-0 right-0 bg-red-500 h-2 w-2 rounded-full"></span>
        </div>
        <CustomeDrawer />
      </div>
    </nav>
  );
};

export default Navbar;
