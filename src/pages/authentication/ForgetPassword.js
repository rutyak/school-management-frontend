import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import InputPassword from "../../components/InputPassword";
const Base_url = process.env.REACT_APP_BACKEND_URL;

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [varified, setVarified] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputStyle =
    "w-full p-2 md:p-4 border border-gray-300 rounded-lg mb-s shadow-sm transition-all duration-300 focus:ring-4 focus:ring-purple-500";

  const navigate = useNavigate();

  const handleValidateEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${Base_url}/validate`, { email });
      if (res.status === 200) {
        toast.success("You can reset password");
        setVarified(true);
      }
    } catch (error) {
      console.error("error....", error);
      if (error.status === 400) {
        toast.error("User not found");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (password !== confirmPassword) {
      toast.error("Password's not matching");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.patch(`${Base_url}/resetpassword`, {
        email,
        password,
      });

      if (res.status === 201) {
        toast.success("Password reset successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("error during reset password: ", error);
      toast.error("Internal server error");
    } finally {
      setLoading(false);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (varified) {
      handleReset();
    } else {
      handleValidateEmail();
    }
  }

  return (
    <>
      <IoArrowBack
        className="mt-10 text-xl text-gray-600"
        onClick={() => navigate("/")}
      />
      <div className="w-[100%] flex flex-col p-3 mb-4 animate-sideInLeft mt-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Forget Password
        </h1>
        <h3 className="text-md text-gray-600 mb-6">
          Enter your email and we'll give you access to reset your password
        </h3>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            name="email"
            className={`${inputStyle} mb-4`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {varified && (
            <>
              <InputPassword
                name="password"
                type="password"
                placeholder="New password"
                state={password}
                setPassword={setPassword}
              />
              <InputPassword
                name="confirmPassword"
                type="password"
                placeholder="New Confirm Password"
                state={confirmPassword}
                setPassword={setConfirmPassword}
              />
            </>
          )}
          <button
            type="submit"
            className="w-[40%] bg-purple-500 text-white p-3 rounded-xl text-md hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
