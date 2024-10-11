import React from "react";
import Table from "../Table";
import Form from "../Form";

const Management = ({
  type,
  salaryView,
  loading,
  handleToggleView,
  setFormData,
  formData,
  isFormVisible,
  setIsFormVisible,
  editMode,
  setEditMode,
  resetForm,
  handleItemClick,
  data,
  headers,
  handleDelete,
  setItemId,
  handleSubmit
}) => {

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
          handleSubmit={handleSubmit}
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
          data={data}
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
