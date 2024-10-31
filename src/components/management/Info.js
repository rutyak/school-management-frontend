import { FaRegEdit } from "react-icons/fa";
import AttendanceLineGraph from "../graphs/AttendanceLineGraph";
import { MdDeleteOutline } from "react-icons/md";

const Info = ({
  filteredItem,
  handleDelete,
  setEditMode,
  setIsFormVisible,
  setFormData,
  setItemId
}) => {


  const strConverter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  function handleEditData(id){
    setItemId(id);
    setIsFormVisible(true);
    setEditMode(true);
    // setFormData(filteredItem);
  }

  return (
    <>
      {filteredItem?.map((item) => (
        <div key={item.id} className="h-[100%] overflow-y-auto scrollbar">
          <div className="flex items-center gap-5 bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-t-xl text-white">
            <div className="flex flex-col">
              <div className="text-2xl font-bold">
                {item.salary
                  ? `${strConverter(item.name)} (Teacher)`
                  : strConverter(item.name)}
              </div>
              <div className="text-sm font-light">
                {item.salary
                  ? `Assigned Class: ${strConverter(
                      item.assignedClass
                    )} | Teacher ID: ${item.id}`
                  : `Class: ${strConverter(item.className)} | Student ID: ${
                      item.id
                    }`}
              </div>
            </div>
          </div>
          {console.log("student id...", item._id)}
          <div className="basic-details p-6 bg-gray-50 rounded-b-xl mobile:px-2 mobile:py-3 sm:p-4 md:p-5 lg:p-6">
            <h3 className="text-lg flex justify-between items-center font-semibold text-gray-700 mb-2 border-b border-gray-300 pb-2">
              Basic Details
              <div className="flex gap-4 items-center">
                <FaRegEdit
                  className="text-4xl text-blue-400 hover:bg-gray-200 hover:text-blue-600 p-2 rounded-xl transition-all duration-300 ease-in-out shadow-lg hover:scale-110"
                  onClick={()=>handleEditData(item._id)}
                />
                <MdDeleteOutline
                  className="text-4xl text-red-600 hover:bg-gray-200 hover:text-red-800 p-2 rounded-xl transition-all duration-300 ease-in-out shadow-lg hover:scale-110"
                  onClick={(e) => handleDelete(item._id)}
                />
              </div>
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium text-gray-600">
                  {item.salary ? `Salary` : `Class Fees`}
                </div>
                <div
                  className={`${
                    item.fees === "paid" ? "text-green-500" : "text-red-500"
                  } text-sm text-gray-800`}
                >
                  {item.salary ? item.salary : strConverter(item.fees)}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Gender</div>
                <div className="text-sm text-gray-800">
                  {strConverter(item.gender)}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">
                  Date of Birth
                </div>
                <div className="text-sm text-gray-800">{item.dob}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Address</div>
                <div className="text-sm text-gray-800">{item.address}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">
                  Phone No.
                </div>
                <div className="text-sm text-gray-800">{item.contact}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Father</div>
                <div className="text-sm text-gray-800">{item.father}</div>
              </div>
            </div>
          </div>

          <div className="progress-section mt-4 p-6 bg-gray-50 rounded-xl mobile:p-2 sm:p-3 md:p-5 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Progress
            </h3>
            <div className="graph-container">
              <AttendanceLineGraph
                type={item.classconducted ? "teacher" : "student"}
                name={item.name}
                percentage={
                  item.classconducted ? item.classconducted : item.attendance
                }
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Info;
