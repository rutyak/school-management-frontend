import React, { useEffect, useState, useCallback } from "react";
import Management from "./Management";
import Info from "./Info";
import AnalyticsChart from "../../pages/analytics/AnalyticsChart";
import ClassAnalytic from "../../pages/class/ClassAnalytic";
import axios from "axios";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
const Base_url = process.env.REACT_APP_BACKEND_URL;

const ManagementComponent = ({
  type,
  formTemplate,
  keyMapping,
  search,
  toggleView,
  salaryView,
  setSalaryView,
  setTeacherData,
  totalIncome,
  teacherData,
}) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [itemId, setItemId] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(formTemplate);
  const [loading, setLoading] = useState(false);
  const { setHideInput } = useOutletContext();
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

  const apiEndpoints = {
    fetch: `${Base_url}/fetch/${
      type === "Analytics" ? "teacher" : type.toLowerCase()
    }`,
    create: `${Base_url}/create/${type.toLowerCase()}`,
    update: `${Base_url}/update/${type.toLowerCase()}`,
    delete: `${Base_url}/delete/${type.toLowerCase()}`,
  };

  setHideInput(type === "Analytics");
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiEndpoints.fetch);
      if (res.data.length > 0) {
        const columnKeys = Object.keys(res.data[0]);

        const updatedData =
          type === "Analytics"
            ? res.data.map((item) => ({
                ...item,
                salary:
                  salaryView === "Monthly" ? item.salary : item.salary * 12,
              }))
            : res.data;

        const modifiedColumnKeys =
          type === "Analytics"
            ? columnKeys.filter(
                (key) =>
                  key !== "dob" &&
                  key !== "contact" &&
                  key !== "_id" &&
                  key !== "__v"
              )
            : columnKeys.slice(1, -1);

        setData(updatedData);
        console.log("updated data :", updatedData);
        if (type === "Analytics") setTeacherData(updatedData);
        setColumns(modifiedColumnKeys);
      } else {
        setData([]);
        setColumns([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data!");
    } finally {
      setLoading(false);
    }
  }, [apiEndpoints.fetch, salaryView, type, setData, setTeacherData]);

  useEffect(() => {
    getData();
  }, [getData]); // eslint-disable-line react-hooks/exhaustive-deps

  console.log("filteredItem: ", filteredItem);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentsInSubject = data.filter(
        (student) => student.className === formData.className
      );
      if (studentsInSubject.length >= 10) {
        toast.error(
          `Cannot add more students to ${formData.className}. Limit reached!`
        );
        return;
      }

      setIsFormVisible(false);

      console.log("after submit....", formData);
      await axios.post(apiEndpoints.create, formData);
      toast.success(`${type} added successfully!`);
      await getData();
    } catch (error) {
      console.error(
        `Error creating ${type.toLowerCase()}:`,
        error.request.response
      );
      toast.error(`Cannot add ${type.toLowerCase()}!`);
    }
    resetForm();
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const studentsInSubject = data.filter(
        (student) => student.className === formData.className
      );
      if (studentsInSubject.length >= 10) {
        toast.error(
          `Cannot add more students to ${formData.className}. Limit reached!`
        );
        return;
      }
      setIsFormVisible(false);
      await axios.put(`${apiEndpoints.update}/${itemId}`, formData);
      toast.success(`${type} edited successfully!`);
      await getData();
    } catch (error) {
      console.error(`Error editing ${type.toLowerCase()}:`, error.message);
      toast.error(`Cannot edit ${type.toLowerCase()}!`);
    }
    resetForm();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiEndpoints.delete}/${id}`);
      toast.success(`${type} deleted successfully!`);
      await getData();
    } catch (error) {
      console.error(`Error deleting ${type.toLowerCase()}:`, error.message);
      toast.error(`Cannot delete ${type.toLowerCase()}!`);
    }
  };

  const resetForm = () => {
    setFormData(formTemplate);
    setItemId(null);
    setEditMode(false);
    setIsFormVisible(false);
  };

  const headers = columns.map((col) => ({
    key: col,
    label: keyMapping[col] || col.charAt(0).toUpperCase() + col.slice(1),
  }));

  const handleToggleView = async (view) => {
    setSalaryView(view);
    toggleView(view);
  };

  const filteredData = data?.filter((item) => {
    const searchItem = search?.toLowerCase().trim();
    return columns.some((key) => {
      const value = item[key];
      if (typeof value === "string") {
        return value.toLowerCase().trim().includes(searchItem);
      }
      return false;
    });
  });

  function handleItemClick(id, className, teacherName) {
    console.log("id in conainer class id: ", id);
    setItemId(id);
    setNewClassName({ className, teacher: teacherName });
    const filtered = data?.filter((item) => item._id === id);
    setFilteredItem(filtered);
  }

  const renderContent = () => {
    switch (type) {
      case "Analytics":
        return (
          <div className="p-4 h-full flex flex-col items-center mt-3 sm:p-3 md:p-4 lg:h-full">
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
            handleEditSubmit={handleEditSubmit}
            handleDelete={handleDelete}
            setEditMode={setEditMode}
            setIsFormVisible={setIsFormVisible}
            filteredItem={filteredItem}
            setFormData={setFormData}
            setItemId={setItemId}
            itemId={itemId}
            classData={data}
          />
        );

      default:
        return (
          <Info
            filteredItem={filteredItem}
            handleEditSubmit={handleEditSubmit}
            handleDelete={handleDelete}
            setEditMode={setEditMode}
            setIsFormVisible={setIsFormVisible}
            setFormData={setFormData}
            setItemId={setItemId}
            data={data}
          />
        );
    }
  };

  return (
    <div className="w-full h-full flex gap-5 items-center justify-center flex-col lg:flex-row lg:gap-3 lg:w-full xl:gap-5 p-2 xl:p-0 xl:py-5">
      <div className="lg:w-[40%] lg:h-full student-list p-1 border rounded-xl bg-white ">
        <Management
          type={type}
          salaryView={salaryView}
          loading={loading}
          handleToggleView={handleToggleView}
          setFormData={setFormData}
          formData={formData}
          isFormVisible={isFormVisible}
          setIsFormVisible={setIsFormVisible}
          editMode={editMode}
          setEditMode={setEditMode}
          resetForm={resetForm}
          handleItemClick={handleItemClick}
          data={filteredData.length > 0 ? filteredData : data}
          headers={headers}
          handleDelete={handleDelete}
          setItemId={setItemId}
          handleSubmit={editMode ? handleEditSubmit : handleSubmit}
        />
      </div>
      <div className="lg:flex-1 border rounded-xl bg-white shadow-md p-2 lg:h-full lg:overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default ManagementComponent;
