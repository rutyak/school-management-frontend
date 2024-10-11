import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";
import StudentChart from "../../components/StudentChart";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Base_url = process.env.REACT_APP_BACKEND_URL;

const ClassAnalytic = ({
  className,
  teacherName,
  handleEditSubmit,
  handleDelete,
}) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemId, setItemId] = useState();

  const keyMapping = {
    name: "Name",
    contact: "Contact Number",
    fees: "Fees Paid",
    className: "Class Name",
  };

  async function getData() {
    try {
      const res = await axios.get(`${Base_url}/fetch/student`);
      let columnKeys = Object.keys(res.data[0]);
      setData(res.data);
      setColumns(columnKeys);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && className) {
      const filtered = data.filter((item) => item.className === className);
      setFilteredData(filtered);
    }
  }, [data, className]);

  const headers = columns.map((col) => ({
    key: col,
    label: keyMapping[col] || col.charAt(0).toUpperCase() + col.slice(1),
  }));

  const handleStudentDelete = async (id) => {
    try {
      setItemId(id);
      await axios.delete(`${Base_url}/delete/student/${id}`);
      toast.success(`Student deleted successfully!`);
      await getData();
    } catch (error) {
      toast.error(`Cannot delete student!`);
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="h-[100%] overflow-auto scrollbar bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="flex items-center gap-5 bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-t-xl text-white shadow-lg">
        <div className="flex flex-col">
          <div className="text-3xl font-extrabold">
            {className.charAt(0).toUpperCase() + className.slice(1)}
          </div>
          <div className="text-lg font-light">
            Teacher:{" "}
            {teacherName.charAt(0).toUpperCase() + teacherName.slice(1)}
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-4 mobile:p-2 sm:p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl flex items-center justify-between font-bold text-gray-800 mb-6">
          Student List
          <div className="flex gap-4 items-center">
            <FaRegEdit
              className="text-4xl text-blue-400 hover:bg-gray-200 hover:text-blue-600 p-2 rounded-xl transition-all duration-300 ease-in-out shadow-lg hover:scale-110"
              onClick={(e) => handleEditSubmit(e, itemId)}
            />
            <MdDeleteOutline
              className="text-4xl text-red-600 hover:bg-gray-200 hover:text-red-800 p-2 rounded-xl transition-all duration-300 ease-in-out shadow-lg hover:scale-110"
              onClick={(e) => handleDelete(itemId)}
            />
          </div>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto text-left mb-6">
              <Table
                type="StudentList"
                data={filteredData}
                headers={headers}
                handleDelete={handleStudentDelete}
                className="table-auto w-full text-left border-collapse pointer-events-none"
              />
            </div>

            <StudentChart data={filteredData} />
          </>
        )}
      </div>
    </div>
  );
};

export default ClassAnalytic;
