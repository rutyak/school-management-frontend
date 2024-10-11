import React from "react";
import Form from "./Form";
import "../index.css";

const Table = ({
  type,
  setFormData,
  formData,
  headers,
  data,
  handleDelete,
  handleEditSubmit,
  setItemId,
  setIsFormVisible,
  isFormVisible,
  setEditMode,
  handleItemClick,
}) => {
  const tableCellClass =
    "py-3 px-6 text-md text-gray-800 whitespace-nowrap mobile:py-3 mobile:px-1 mobile:text-[13px] mobile:leading-[15px] md:text-sm lg:text-md lg:text-sm lg:px-4 lg:py-4 xl:text-md";

  const tableHeaderClass =
    "py-3 px-6 text-left text-md font-medium text-gray-700 whitespace-nowrap mobile:py-3 mobile:px-1 mobile:text-[13px] mobile:leading-[15px] sm:py-2 sm:px-4 sm:text-sm lg:text-sm lg:px-3 lg:py-2.5 xl:text-md xl:py-3 xl:px-6";

  // const buttonBaseClass =
  //   "flex items-center px-4 py-2 text-sm font-semibold text-white rounded-md transition-transform transform hover:scale-105 mobile:px-2 mobile:py-1 sm:text-xs sm:px-3 sm:py-1.5 lg:text-sm lg:px-4 lg:py-2 xl:text-md";

  // const handleEditClick = (item, id) => {
  //   setFormData(item);
  //   setIsFormVisible(true);
  //   setEditMode(true);
  //   setItemId(id);
  // };

  function strConverter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="max-w-full max-h-[430px] flex justify-center overflow-x-auto scrollbar">
      <div className="w-full">
        <table className="w-full bg-white border-seperate border-spacing-y-5">
          <thead>
            <tr className="bg-gray-100">
              {type === "Class" ? (
                <>
                  <th className={tableHeaderClass}>Class Name</th>
                  <th className={tableHeaderClass}>Teacher</th>
                  <th className={tableHeaderClass}>Class Limit</th>
                  <th className={tableHeaderClass}>Year</th>
                </>
              ) : (
                <>
                  <th className={tableHeaderClass}>
                    {type === "Teacher" || type === "Analytics"
                      ? "Teacher name"
                      : "Name"}
                  </th>
                  <th className={tableHeaderClass}>ID</th>
                  <th className={tableHeaderClass}>
                    {type === "Analytics" ? "Salary" : "Gender"}
                  </th>
                  <th className={tableHeaderClass}>
                    {type === "Teacher" || type === "Analytics"
                      ? "Assigned Class"
                      : "Class Name"}
                  </th>
                </>
              )}
              {/* Only show action buttons if not in analytics mode
              {type !== "Analytics" && (
                <th className={tableHeaderClass}>Actions</th>
              )} */}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item._id}
                  className={`border-b border-gray-200 cursor-pointer`}
                  onClick={ () =>
                          handleItemClick(
                            item._id,
                            item.className,
                            item.teacher
                          )
                  }
                >
                  {type === "Class" ? (
                    <>
                      <td className={tableCellClass}>
                        {strConverter(item.className)}
                      </td>
                      <td className={tableCellClass}>
                        {strConverter(item.teacher)}
                      </td>
                      <td className={tableCellClass}>{item.classlimit}</td>
                      <td className={tableCellClass}>{item.year}</td>
                    </>
                  ) : (
                    <>
                      {/* <td className={tableCellClass}>
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="w-10 h-10 rounded-full"
                        />
                      </td> */}
                      <td className={tableCellClass}>
                        {strConverter(item.name)}
                      </td>
                      <td className={tableCellClass}>{item.id}</td>
                      <td className={tableCellClass}>
                        {type === "Analytics"
                          ? item.salary
                          : strConverter(item.gender)}
                      </td>
                      <td className={tableCellClass}>
                        {type === "Student" || type === "StudentList"
                          ? strConverter(item.className)
                          : strConverter(item.assignedClass)}
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={type === "Class" ? 4 : 5}
                  className={tableCellClass}
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isFormVisible && (
        <Form
          type={type}
          setFormData={setFormData}
          formData={formData}
          handleSubmit={handleEditSubmit}
          isFormVisible={isFormVisible}
          setEditMode={setEditMode}
        />
      )}
    </div>
  );
};

export default Table;
