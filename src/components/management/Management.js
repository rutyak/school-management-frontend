import React, { useEffect, useState, useCallback } from "react";
import Table from "../Table";
import axios from "axios";
import Form from "../Form";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";

const Base_url = process.env.REACT_APP_BACKEND_URL;

const Management = ({
  type,
  formTemplate,
  keyMapping,
  toggleView,
  salaryView,
  setSalaryView,
  setTeacherData,
  search,
  setData,
  data,
  handleItemClick,
}) => {
  const [columns, setColumns] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(formTemplate);
  const [loading, setLoading] = useState(false);
  const { setHideInput } = useOutletContext();
  setHideInput(type === "Analytics");

  const apiEndpoints = {
    fetch: `${Base_url}/fetch/${type === "Analytics" ? "teacher" : type.toLowerCase()}`,
    create: `${Base_url}/create/${type.toLowerCase()}`,
    update: `${Base_url}/update/${type.toLowerCase()}`,
    delete: `${Base_url}/delete/${type.toLowerCase()}`,
  };

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
                salary: salaryView === "Monthly" ? item.salary : item.salary * 12,
              }))
            : res.data;

        const modifiedColumnKeys =
          type === "Analytics"
            ? columnKeys.filter(
                (key) => key !== "dob" && key !== "contact" && key !== "_id" && key !== "__v"
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentsInSubject = data.filter(
        (student) => student.className === formData.className
      );
      if (studentsInSubject.length >= 10) {
        toast.error(`Cannot add more students to ${formData.className}. Limit reached!`);
        return;
      }

      setIsFormVisible(false);

      console.log("after submit....", formData);
      await axios.post(apiEndpoints.create, formData);
      toast.success(`${type} added successfully!`);
      await getData();
    } catch (error) {
      console.error(`Error creating ${type.toLowerCase()}:`, error.request.response);
      toast.error(`Cannot add ${type.toLowerCase()}!`);
    }
    resetForm();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentsInSubject = data.filter(
        (student) => student.className === formData.className
      );
      if (studentsInSubject.length >= 10) {
        toast.error(`Cannot add more students to ${formData.className}. Limit reached!`);
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
    await getData();
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

  return (
    <div className="w-full p-4 space-y-6 mobile:w-full mobile:p-2 sm:p-4 md:p-4 lg:p-4 lg:w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-600">
          {type === "Analytics" ? type : `${type} List`}
        </h1>
        {type === "Analytics" ? (
          <div className="space-x-2">
            <button
              className={`px-4 py-2 font-semibold rounded-md transition-transform transform hover:scale-105 ${
                salaryView === "Monthly" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => handleToggleView("Monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 font-semibold rounded-md transition-transform transform hover:scale-105 ${
                salaryView === "Yearly" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => handleToggleView("Yearly")}
            >
              Yearly
            </button>
          </div>
        ) : (
          <button
            className="bg-gray-200 text-blue-400 px-4 py-2 rounded-md shadow hover:bg-gray-300 transition-transform transform hover:scale-105"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            {isFormVisible ? "Hide Form" : `Add ${type}`}
          </button>
        )}
      </div>

      {isFormVisible && (
        <Form
          type={type}
          setFormData={setFormData}
          formData={formData}
          handleSubmit={editMode ? handleEditSubmit : handleSubmit}
          setIsFormVisible={setIsFormVisible}
          isFormVisible={isFormVisible}
          editMode={editMode}
          resetForm={resetForm}
        />
      )}

      <hr className="w-full border-gray-300 my-3" />

      {loading ? (
        <div className="flex justify-center py-6">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <Table
          type={type}
          setFormData={setFormData}
          formData={formData}
          data={filteredData.length > 0 ? filteredData : data}
          headers={headers}
          handleDelete={handleDelete}
          setItemId={setItemId}
          setIsFormVisible={setIsFormVisible}
          setEditMode={setEditMode}
          handleItemClick={handleItemClick}
        />
      )}
    </div>
  );
};

export default Management;
