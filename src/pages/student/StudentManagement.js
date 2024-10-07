import { useOutletContext } from "react-router-dom";
import ManagementComponent from "../../components/management/ManagementComponent";

const StudentManagement = () => {
  const { search, setSearch, setLinkType } = useOutletContext();
  setLinkType("Student");

  const studentsFormTemplate = {
    name: "",
    photo: "",
    id: "",
    gender: "",
    dob: "",
    contact: "",
    fees: "",
    className: "",
  };

  const studentkeyMapping = {
    name: "Name",
    id: "Roll no.",
    gender: "Gender",
    dob: "Date of Birth",
    contact: "Contact Number",
    fees: "Fees Paid",
    className: "Class Name",
  };

  return (
        <ManagementComponent
          type="Student"
          formTemplate={studentsFormTemplate}
          keyMapping={studentkeyMapping}
          search={search}
          setSearch={setSearch}
        />
  );
};

export default StudentManagement;
