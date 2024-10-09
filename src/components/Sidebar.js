import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentDuotone } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomeDrawer from "./CustomeDrawer";
import { useDisclosure } from "@chakra-ui/react";

const Sidebar = ({ openMenu, setOpenMenu }) => {
  const [active, setActive] = useState("Class");
  const {onOpen} = useDisclosure();
 
  const styling =
    "flex mb-5 items-center sidebar-icon transition-transform duration-300 ease-in-out hover:transform hover:translate-x-2";

  const activeStyle = "px-3 py-2 bg-white text-blue-500 border rounded-xl";

  const handleLinkClicked = (type) => {
    if (type === "Logout") toast.success("Logout successfully !");
    type === "Settings" && onOpen();
    setActive(type);
    setOpenMenu(false);
  };

  return (
    <div
      className={`fixed m-5 border rounded-xl h-screen bg-gradient-to-b from-blue-500 to-blue-300 text-white shadow-lg p-4 transition-all duration-300 ${
        openMenu ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:w-[10%] sm:w-[10%] xl:w-[calc(14%+6px)] xl:h-[calc(94%+3px)]`}
    >
      <div className="flex items-center justify-center p-1 pb-9 font-bold text-2xl lg:gap-2 xl-4">
        <img
          className="w-[26%]"
          src="https://www.codester.com/static/uploads/items/000/008/8870/icon.png"
          alt="school-logo"
        />
        <span className="hidden xl:block">SCHOOL</span>
      </div>

      <div className="sidebar-content ml-4 lg:ml-7 xl:ml-4">
        {/* <Link
          to="/main"
          className={`${styling} ${active === "Dashboard" ? activeStyle : ""}`}
          onClick={() => handleLinkClicked("Dashboard")}
        >
          <LuLayoutDashboard className="w-6 h-6 sm:w-8 sm:h-8 md:w-6 md:h-6 mr-2" />
          <span className="text-lg hidden xl:block">Dashboard</span>
        </Link> */}

        <Link
          to="/main/"
          className={`${styling} ${active === "Class" ? activeStyle : ""}`}
          onClick={() => handleLinkClicked("Class")}
        >
          <SiGoogleclassroom className="w-6 h-6 sm:w-8 sm:h-8 md:w-6 md:h-6 mr-2" />
          <span className="text-lg hidden xl:block">Class</span>
        </Link>

        <Link
          to="/main/student"
          className={`${styling} ${active === "Student" ? activeStyle : ""}`}
          onClick={() => handleLinkClicked("Student")}
        >
          <PiStudentDuotone className="w-6 h-6 sm:w-7 sm:h-7 md:w-6 md:h-6 mr-2" />
          <span className="text-lg hidden xl:block">Student</span>
        </Link>

        <Link
          to="/main/teacher"
          className={`${styling} ${active === "Teacher" ? activeStyle : ""}`}
          onClick={() => handleLinkClicked("Teacher")}
        >
          <LiaChalkboardTeacherSolid className="w-6 h-6 sm:w-7 sm:h-7 md:w-6 md:h-6 mr-2" />
          <span className="text-lg hidden xl:block">Teacher</span>
        </Link>
        
        <Link
          to="/main/analytics"
          className={`${styling} ${active === "Analytics" ? activeStyle : ""}`}
          onClick={() => handleLinkClicked("Analytics")}
        >
          <TbBrandGoogleAnalytics className="w-6 h-6 sm:w-7 sm:h-7 md:w-6 md:h-6 mr-2" />
          <span className="text-lg hidden xl:block">Analytics</span>
        </Link>

        <div
          className={`${styling} ${
            active === "Settings" ? activeStyle : ""
          } absolute bottom-5 left-9 w-[80%]`}
          onClick={() => handleLinkClicked("Settings")}
        >
          <CustomeDrawer type="Settings"/>
        </div>
      </div>

      
    </div>
  );
};

export default Sidebar;
