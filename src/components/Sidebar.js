import { SiGoogleclassroom } from "react-icons/si";
import { PiStudentDuotone } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomeDrawer from "./CustomeDrawer";
import { useDisclosure } from "@chakra-ui/react";

const Sidebar = ({ openMenu, setOpenMenu }) => {
  const [active, setActive] = useState("Class");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const baseStyle =
    "flex items-center gap-3 text-white text-lg xl:text-xl font-medium py-3 px-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-white/10 hover:translate-x-2";

  const activeStyle = "bg-blue-700 text-blue-600 shadow-md";
  const iconStyle = "w-6 h-6 xl:w-7 xl:h-7";

  const handleLinkClicked = (type) => {
    if (type === "Logout") toast.success("Logout successfully!");
    if (type === "Settings") onOpen();
    setActive(type);
    setOpenMenu(false);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-blue-900 to-blue-700 p-4 shadow-lg relative hidden xl:block">
      {/* Logo */}
      <div className="flex items-center justify-center pb-10">
        <div className="flex items-center gap-3">
          <img
            className="w-12 xl:w-14"
            src="https://www.codester.com/static/uploads/items/000/008/8870/icon.png"
            alt="school-logo"
          />
          <span className="text-white text-2xl font-bold hidden xl:block">
            SCHOOL
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-4">
        <Link
          to="/main/"
          className={`${baseStyle} ${active === "Class" ? activeStyle : ""}`}
          onClick={() => handleLinkClicked("Class")}
        >
          <SiGoogleclassroom className={iconStyle} />
          <span className="hidden xl:block">Courses</span>
        </Link>

        <Link
          to="/main/student"
          className={`${baseStyle} ${active === "Student" ? activeStyle : ""}`}
          onClick={() => handleLinkClicked("Student")}
        >
          <PiStudentDuotone className={iconStyle} />
          <span className="hidden xl:block">Student</span>
        </Link>

        <Link
          to="/main/teacher"
          className={`${baseStyle} ${active === "Teacher" ? activeStyle : ""}`}
          onClick={() => handleLinkClicked("Teacher")}
        >
          <LiaChalkboardTeacherSolid className={iconStyle} />
          <span className="hidden xl:block">Teacher</span>
        </Link>

        <Link
          to="/main/analytics"
          className={`${baseStyle} ${
            active === "Analytics" ? activeStyle : ""
          }`}
          onClick={() => handleLinkClicked("Analytics")}
        >
          <TbBrandGoogleAnalytics className={iconStyle} />
          <span className="hidden xl:block">Analytics</span>
        </Link>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <CustomeDrawer
            type="Settings"
            baseStyle={baseStyle}
            activeStyle={activeStyle} 
            active={active}
            handleLinkClicked={handleLinkClicked}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
