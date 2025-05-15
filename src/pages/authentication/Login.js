import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputPassword from "../../components/InputPassword";

const Base_url = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  const inputStyle =
    "w-full p-2 md:p-4 border border-gray-300 rounded-lg mb-s shadow-sm transition-all duration-300 focus:ring-4 focus:ring-purple-500";

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/main");
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const obj = {
      email,
      password,
    };
    console.log(obj);

    try {
      const res = await axios.post(`${Base_url}/login`, obj);
      console.log("res ", res);

      if (res.status === 200) {
        toast.success(res.data.message);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/main");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Invalid credentials");
      console.error(error);
    }
  }

  return (
    <div className="w-[100%] flex flex-col p-3 mb-4 animate-sideInLeft mt-24 md:mt-32 xl:mt-20">
      <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-800 mb-2">
        Welcome Back!
      </h1>
      <h3 className="text-sm  md:text-md text-gray-600 mb-6">
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
        <InputPassword
          name="password"
          type="password"
          placeholder="Enter password"
          state={password}
          setPassword={setPassword}
        />

        <div className="flex justify-between items-center mb-11">
          {/* <div className="flex justify-center gap-2">
            <input
              className="transform scale-150 ml-1"
              type="checkbox"
              onClick={(e) => setIsChecked(e.target.checked)}
            />
            <span className="text-gray-700">Remember me</span>
          </div> */}
          {/* <div className="hover:underline cursor-pointer" onClick={()=>navigate("/forgetpassword")}>Forgot Password?</div> */}
        </div>
        <button className="w-auto bg-purple-500 text-white px-5 py-2 md:py-3 md:px-6 rounded-xl text-md hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:scale-105 absolute bottom-36">
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>
      <div className="text-gray-600 absolute bottom-24">
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
