import schoolbanner from "../assets/school-banner.jpg";
import { Outlet } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-200">
      <div className="relative w-full md:max-w-[600px] xl:max-w-6xl max-h-[90vh] md:max-h-[85vh] xl:max-h-[90vh] flex justify-evenly bg-white shadow-2xl border rounded-xl p-3 border-purple-300 lg:gap-12 xl:gap-28 mx-3 md:mx-8 xl:mx-0 overflow-y-auto" style={{ height: "95vh"}}>
        <div className="flex flex-col w-full xl:w-[30%]">
          <div className="text-purple-600 flex items-center gap-3 md:pt-2 lg:pt-1">
            <img
              className="w-[9%]"
              src="https://www.codester.com/static/uploads/items/000/008/8870/icon.png"
              alt="school-logo"
            />
            <div className="text-gray-300 text-sm md:text-[16px]">
              School Management System
            </div>
          </div>
          <Outlet />
        </div>
        <div className="w-[45%] h-full max-h-[580px] flex justify-center items-center animate-fadeIn hidden xl:block lg:w-[45%]">
          <img
            className="h-full shadow-2xl rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 object-cover"
            src={schoolbanner}
            alt="school-banner-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
