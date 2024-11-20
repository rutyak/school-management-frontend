import schoolbanner from "../assets/school-banner.jpg";
import { Outlet } from "react-router-dom";

const Welcome = () => {

  const inputStyle = "w-full p-4 border border-gray-300 rounded-lg mb-s shadow-sm transition-all duration-300 focus:ring-4 focus:ring-purple-500";

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-200">
      <div className="w-[90%] h-[95%] flex justify-evenly  bg-white shadow-2xl border rounded-xl p-3 border-purple-300 mobile:w-full mobile:h-auto md:w-[80%] lg:w-[95%] lg:gap-12 lg:h-[92%] xl:gap-28 xl:h-[95%] xl:w-[90%]">
        <div className="w-[30%] flex flex-col mobile:w-full lg:w-[40%] xl:w-[30%]">
          <div className="text-purple-600 flex items-center gap-3 mobile:pt-6 md:pt-2 lg:pt-1">
            <img className="w-[9%]" src="https://www.codester.com/static/uploads/items/000/008/8870/icon.png" alt="school-logo"/>
            <div className="text-gray-300">School Management System</div>
          </div> 
          <Outlet context={{inputStyle}}/>
        </div>
        <div className="w-[45%] flex justify-center items-center animate-fadeIn mobile:hidden lg:block mobile:w-full lg:w-[45%] xl:mt-4">
          <img
            className=" h-[92%] shadow-2xl rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
            src={schoolbanner}
            alt="school-banner-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
