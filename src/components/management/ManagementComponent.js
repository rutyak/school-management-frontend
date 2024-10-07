import { useState } from "react";
import Management from "./Management";
import Info from "./Info";
import AnalyticsChart from "../../pages/analytics/AnalyticsChart";
import ClassAnalytic from "../../pages/class/ClassAnalytic";

const ManagementComponent = ({
  type,
  formTemplate,
  keyMapping,
  search,
  setSearch,
  buttonStyle,
  toggleView,
  salaryView,
  setSalaryView,
  setTeacherData,
  totalIncome,
  teacherData,
}) => {
  const [data, setData] = useState([]);
  const [filteredItem, setFilteredItem] = useState([
    {
      address: "-",
      attendance: 0,
      className: "mathematics",
      contact: "7448161477",
      dob: "12/12/2006",
      father: "-",
      fees: "paid",
      gender: "male",
      id: "sbb-345",
      name: "Rutik Khandekar",
    },
  ]);
  const [newClassName, setNewClassName] = useState({
    className: "mathematics",
    teacher: "Sakshi mam",
  });

  function handleItemClick(id, className, teacherName) {
    setNewClassName({ className, teacher: teacherName });
    const filtered = data?.filter((item) => item._id === id);
    setFilteredItem(filtered);
  }

  const renderContent = () => {
    switch (type) {
      case "Analytics":
        return (
          <div className="p-4 bg-gray-50 h-full flex flex-col items-center mt-3">
            <h2 className="text-center text-xl font-semibold text-gray-700">
              Student Fees per Month: 15000/-
            </h2>
            <AnalyticsChart
              teacherData={teacherData}
              totalIncome={totalIncome}
            />
          </div>
        );

      case "Class":
        return (
          <ClassAnalytic
            className={newClassName?.className}
            teacherName={newClassName?.teacher}
          />
        );

      default:
        return <Info filteredItem={filteredItem} />;
    }
  };

  return (
    <div className="w-full h-[calc(85%+4px)] flex gap-5 items-center justify-center">
      <div
        className="student-list p-1 h-full border rounded-xl bg-white"
        style={{ width: "calc(38% + 6px)" }}
      >
        <Management
          type={type}
          formTemplate={formTemplate}
          keyMapping={keyMapping}
          search={search}
          setSearch={setSearch}
          setData={setData}
          data={data}
          handleItemClick={handleItemClick}
          salaryView={salaryView}
          setSalaryView={setSalaryView}
          toggleView={toggleView}
          setTeacherData={setTeacherData}
        />
      </div>
      <div className="student-info h-full w-[60%] border rounded-xl bg-white shadow-md p-2">
        {renderContent()}
      </div>
    </div>
  );
};

export default ManagementComponent;
