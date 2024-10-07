import { useOutletContext } from "react-router-dom";
import ManagementComponent from "../../components/management/ManagementComponent";

const TeacherManagement = () => {

  const { search, setSearch, setLinkType } = useOutletContext();
  setLinkType("Teacher")
  
  const teacherFormTemplate = {
    name: "",
    photo: "",
    id: "",
    gender: "",
    dob: "",
    contact: "",
    salary: "",
    assignedClass: "",
  };

  const teacherKeyMapping = {
    name: "Name",
    gender: "Gender",
    dob: "Date of Birth",
    contact: "Contact Number",
    salary: "Salary",
    assignedClass: "Assigned Class",
  };
 
  return (
      <ManagementComponent
          type="Teacher"
          formTemplate={teacherFormTemplate}
          keyMapping={teacherKeyMapping}
          search={search}
          setSearch={setSearch}
      />
  );
};

export default TeacherManagement;

