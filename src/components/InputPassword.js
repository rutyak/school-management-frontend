import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const InputPassword = ({
  name,
  type,
  placeholder,
  state,
  setPassword,
}) => {
  const [showPass, setShowPass] = useState(true);
  const inputStyle = "w-full p-4 border border-gray-300 rounded-lg mb-s shadow-sm transition-all duration-300 focus:ring-4 focus:ring-purple-500";

  return (
    <div className="relative">
      <input
        name={name}
        className={`${inputStyle} mb-4`}
        type={showPass? type: "text"}
        placeholder={placeholder}
        value={state}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <span className="absolute right-6 top-5 text-lg text-gray-400" onClick={()=>setShowPass(!showPass)}>
        { showPass? <IoEyeOff/>: <IoEye/>}
      </span>
    </div>
  );
};

export default InputPassword;
