import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

const Base_url = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { inputStyle } = useOutletContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      email,
      password,
    };

    try {
      const res = await axios.post(`${Base_url}/login`, obj);
      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/main"); 
      }
    } catch (error) {
      toast.error("Invalid credentials");
    }
  }

  return (
    <div className="w-[100%] flex flex-col p-3 mb-4 animate-sideInLeft mt-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
      <h3 className="text-md text-gray-600 mb-6">
        Hey, Welcome back to your special place
      </h3>
      <form onSubmit={handleSubmit}>
        <input
          className={`${inputStyle} mb-4`}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={`${inputStyle} mb-2`}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between items-center mb-11">
          <div className="flex items-center gap-2">
            <input className="transform scale-150 ml-1" type="checkbox" />
            <span className="text-gray-700">Remember me</span>
          </div>
          <div className="hover:underline cursor-pointer">Forgot Password?</div>
        </div>
        <button className="w-[40%] bg-purple-500 text-white p-3 rounded-xl text-md hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:scale-105 mb-20">
          Login
        </button>
      </form>
      <div className="text-gray-600">
        Don't have an account?{" "}
        <span
          className="text-purple-500 hover:underline cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default Login;
