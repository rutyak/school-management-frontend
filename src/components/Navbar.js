import { GiHamburgerMenu } from "react-icons/gi";
import { FaBell } from "react-icons/fa";
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
      <nav className="w-full mb-[20px] border rounded-xl bg-white px-8 shadow-lg z-20 mobile:px-3 mobile:flex mobile:gap-4 mobile:items-center mobile:rounded-none mobile:py-2 mobile:h-17 md:h-19 lg:h-20">
        <GiHamburgerMenu
          className="text-2xl block mobile:text-2xl xl:hidden"
          onClick={handleToggleMenu}
        />
        <div className="w-full flex justify-between items-center">
          <div className="text-black text-3xl font-bold mobile:text-[18px] modile:leading-[24px] md:text-2xl">
            {linkType.toUpperCase()}
          </div>
          {hideInput ? (
            " "
          ) : (
            <input
              type="text"
              className="w-[50%] p-3 border border-blue-400 rounded-md h-10 focus:ring-blue-400 focus:outline-none focus:ring-2 mobile:w-[70%] mobile:h-8 md:h-9 sm:w-[60%] lg:h-10"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
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
