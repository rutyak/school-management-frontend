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
  const isAnalytics = type === "Analytics";

  return (
    <div className="w-full p-4 space-y-6 lg:w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-700">
          {isAnalytics ? "Analytics" : `${type} List`}
        </h1>

        {isAnalytics ? (
          <div className="flex gap-2">
            {["Monthly", "Yearly"].map((view) => (
              <button
                key={view}
                className={`px-5 py-2 rounded-md font-semibold transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  salaryView === view
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleToggleView(view)}
              >
                {view}
              </button>
            ))}
          </div>
        ) : (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            {`Add ${type}`}
          </button>
        )}
      </div>

      {/* Form */}
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

      <hr className="border-t border-gray-300 my-4" />

      {/* Loader or Table */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
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
