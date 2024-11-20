import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import ManagementComponent from "../../components/management/ManagementComponent";
const Base_url = process.env.REACT_APP_BACKEND_URL;

const Analytics = () => {
  const [activeView, setActiveView] = useState("Monthly");
  const [salaryView, setSalaryView] = useState("Monthly");
  const [teacherData, setTeacherData] = useState([]);
  const [studentData, setStudentData] = useState([]);

  const { setLinkType } = useOutletContext();
  setLinkType("Analytics");

  const toggleView = (view) => {
    setActiveView(view);
  };

  const buttonStyle = (view) =>
    `px-4 py-2 mx-1 rounded-md text-sm font-semibold transition-colors duration-300 ${
      activeView === view
        ? "bg-blue-600 text-white shadow-md"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  const analyticsKeyMapping = {
    name: "Teacher",
    gender: "Gender",
    salary: "Salary",
    assignedClass: "Assigned Class",
  };

  async function getData() {
    try {
      const res = await axios.get(`${Base_url}/fetch/student`);
      setStudentData(res.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  },[]);

  const totalIncome =
   salaryView === "Yearly" ? 15000 * 12 * studentData : 15000 * studentData;

  return (
    <>
      <ManagementComponent
        type="Analytics"
        keyMapping={analyticsKeyMapping}
        buttonStyle={buttonStyle}
        toggleView={toggleView}
        salaryView={salaryView}
        setSalaryView={setSalaryView}
        setTeacherData={setTeacherData}
        totalIncome={totalIncome} 
        teacherData={teacherData} 
      />
    </>
  );
};

export default Analytics;
