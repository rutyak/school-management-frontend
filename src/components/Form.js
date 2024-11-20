import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdClose } from "react-icons/md";
const Base_url = process.env.REACT_APP_BACKEND_URL;

const Form = ({
  type,
  setFormData,
  formData,
  handleSubmit,
  setIsFormVisible,
  isFormVisible,
  editStyle,
  editMode,
  resetForm,
  setIsEditVisible,
  isEditVisible,
}) => {
  const [errorMessages, setErrorMessages] = useState({});
  const [teachersData, setTeachersData] = useState({});
  const [teachersList, setTeachersList] = useState([]);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await axios.get(`${Base_url}/fetch/teacher`);
        console.log("res: ", res);
        setTeachersData(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTeachers();
  }, []);

  useEffect(()=>{
      if(Array.isArray(teachersData)){
        setTeachersList(teachersData.map((data)=>data.name));
      }
  },[teachersData]);

  type === "class" && setTeachersList(teachersData?.filter((data) => data.name));

  const keyMapping = {
    name: "Name",
    // photo: "Photo",
    id: type === "Teacher" ? "Id no." : "Roll no.",
    gender: "Gender",
    dob: "Date of Birth",
    contact: "Contact Number",
    fees: "Fees Paid",
    className: "Class Name",
    salary: "Salary",
    assignedClass: "Assigned Class",
    teacher: "Teacher",
    classlimit: "Class Limit",
    year: "Year",
    father: "Father's name",
    attendance: "Attendance",
    address: "Address",
    classconducted: "Class Conducted",
  };

  const handleFormData = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleClose = () => {
    resetForm();
    setIsFormVisible(false);
  };

  const validateForm = () => {
    const { contact, dob } = formData;
    const errors = {};

    if (contact && contact.length !== 10) {
      errors.contact = "Contact number must be exactly 10 digits.";
    }

    if (dob) {
      const birthDate = new Date(dob);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      if (age <= 10) {
        errors.dob = "Must be above 10 years old.";
      }
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitWithValidation = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    }
  };

  const inputStyle =
    "w-[90%] mx-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 mobile:p-1 lg:p-2";
  const labelStyle = "block text-gray-700 text-sm font-medium mb-2";
  const formContainerStyle =
    "relative w-[100%] max-w-lg p-8 bg-white rounded-lg shadow-lg mobile:p-4 mobile:w-[90%] lg:w-[600px] lg:p-8";

  const formFields = {
    Student: [
      { name: "name", type: "text", placeholder: "Enter your name" },
      // { name: "photo", type: "file" },
      { name: "id", type: "text", placeholder: "eg. ts-234" },
      { name: "gender", type: "select", options: ["Male", "Female", "Other"] },
      { name: "dob", type: "date" },
      { name: "contact", type: "tel", placeholder: "Enter your number" },
      { name: "fees", type: "select", options: ["Paid", "Unpaid"] },
      {
        name: "className",
        type: "select",
        options: [
          "Mathematics",
          "Science",
          "Physics",
          "Biology",
          "Chemistry",
          "English",
        ],
      },
      { name: "father", type: "text", placeholder: "Enter your father's name" },
      {
        name: "attendance",
        type: "number",
        placeholder: "Enter attendance in %",
      },
      { name: "address", type: "text", placeholder: "Enter your address" },
    ],
    Teacher: [
      { name: "name", type: "text", placeholder: "Enter your name" },
      // { name: "photo", type: "file" },
      { name: "id", type: "text" },
      { name: "gender", type: "select", options: ["Male", "Female", "Other"] },
      { name: "dob", type: "date" },
      { name: "contact", type: "tel", placeholder: "Enter your number" },
      { name: "salary", type: "number", placeholder: "Enter your salary" },
      {
        name: "assignedClass",
        type: "select",
        options: [
          "Mathematics",
          "Science",
          "Physics",
          "Biology",
          "Chemistry",
          "English",
        ],
      },
      { name: "father", type: "text", placeholder: "Enter your father's name" },
      {
        name: "classconducted",
        type: "number",
        placeholder: "Enter total class conducted",
      },
      { name: "address", type: "text", placeholder: "Enter your address" },
    ],
    Class: [
      {
        name: "className",
        type: "select",
        options: [
          "Mathematics",
          "Science",
          "Physics",
          "Biology",
          "Chemistry",
          "English",
        ],
      },
      {
        name: "teacher",
        type: "select",
        options: teachersList,
      },
      {
        name: "classlimit",
        type: "number",
        placeholder: "Enter class limit",
      },
      {
        name: "year",
        type: "select",
        options: ["2018", "2019", "2020", "2021", "2022", "2023"],
      },
    ],
  };

  return (
    <div>
      {!isFormVisible && (
        <button
          onClick={() =>
            editMode ? setIsEditVisible(true) : setIsFormVisible(true)
          }
          className={
            "text-blue-500 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 font-semibold py-2 px-4 transition-colors duration-300"
          }
        >
          {editMode ? (
            <FaRegEdit
              className="text-4xl text-blue-400 p-2 transition-all duration-300 ease-in-out"
              onClick={() => setIsEditVisible(true)}
            />
          ) : (
            `Add ${type}`
          )}
        </button>
      )}

      {isFormVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-100 bg-opacity-50 z-50">
          <div className={formContainerStyle}>
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close form"
            >
              <MdClose className="h-6 w-6" />
            </button>
            <form
              onSubmit={handleSubmitWithValidation}
              className="max-h-[530px] overflow-y-auto scrollbar"
            >
              <h2 className="text-2xl font-bold mb-5 text-center text-gray-800 mobile:text-xl lg:text-2xl">
                {type} Registration Form
              </h2>

              {formFields[type]?.map((field, index) => (
                <div className="mb-4" key={index}>
                  <label className={labelStyle}>{keyMapping[field.name]}</label>

                  {field.type === "select" ? (
                    <select
                      name={field?.name}
                      className={inputStyle}
                      onChange={handleFormData}
                      value={formData[field.name] || ""}
                      required
                    >
                      <option value="">Select</option>
                      {field.options.map((option) => (
                        <option key={option} value={option?.toLowerCase()}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    // ) : field.type === "file" ? (
                    //   <input
                    //     name={field.name}
                    //     className={`${inputStyle} bg-blue-200`}
                    //     type="file"
                    //     accept="image/*"
                    //     onChange={handleFormData}

                    //     placeholder="Add image"
                    //     required
                    //   />
                    <input
                      name={field.name}
                      className={inputStyle}
                      type={field.type}
                      placeholder={field.placeholder || ""}
                      onChange={handleFormData}
                      value={formData[field.name] || ""}
                      required
                    />
                  )}

                  {errorMessages[field.name] && (
                    <p className="text-red-500 text-sm">
                      {errorMessages[field.name]}
                    </p>
                  )}
                </div>
              ))}

              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors duration-300"
                >
                  {editMode ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
