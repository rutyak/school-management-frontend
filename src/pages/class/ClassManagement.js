import { useOutletContext } from "react-router-dom";
import ManagementComponent from "../../components/management/ManagementComponent";

const ClassManagement = () => {

  const { search, setSearch, setLinkType } = useOutletContext();
  setLinkType("Class") 

  const classFormTemplate = {
    className: "",
    year: "",
    studentFees: "",
    teacher: "",
  }

  const classKeyMapping = {
    teacher: "Teacher",
    year: "Year",
    studentFees: "Student Fees",
    class: "Class Name",
  };

  return (
        <ManagementComponent
          type="Class"
          formTemplate={classFormTemplate}
          keyMapping={classKeyMapping}
          search={search}
          setSearch={setSearch}
        />
  );
};

export default ClassManagement;
