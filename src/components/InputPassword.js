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
  const inputStyle = "w-full py-2 px-3 md:p-4 border border-gray-300 rounded-lg mb-s shadow-sm transition-all duration-300 focus:ring-4 focus:ring-purple-500";

  return (
    <div className="relative mb-4">
      <input
        name={name}
        className={`${inputStyle} `}
        type={showPass? type: "text"}
        placeholder={placeholder}
        value={state}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 cursor-pointer" onClick={()=>setShowPass(!showPass)}>
        { showPass? <IoEyeOff/>: <IoEye/>}
      </span>
    </div>
  );
};

export default InputPassword;
