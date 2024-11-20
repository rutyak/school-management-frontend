import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import InputPassword from "../../components/InputPassword";
const Base_url = process.env.REACT_APP_BACKEND_URL;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { inputStyle } = useOutletContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();    
    if(password !== confirmPassword){
      toast.error("Password's not matching");
      return;
    }
    
    setLoading(true);

    try {
      const obj = {
        email,
        password
      }
      const res = await axios.post(`${Base_url}/signup`,obj);
      if(res.status === 201) {
        setLoading(false);
        toast.success("User registered successfully !");
        navigate("/"); 
      }
    } catch (error) {
      setLoading(false);
      toast.error("User already registered");
    }
   
  }

  // function handleGoogleSignUp() {
  //   console.log("Sign up with Google clicked");
  // }

  return (
    <div className="w-[100%] flex flex-col p-3 mb-4 animate-sideInLeft mt-10 md:mt-5">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Sign Up</h1>
      <h3 className="text-md text-gray-600 mb-6">
        Create your account to keep up with school news!
      </h3>

      {/* <div className="flex justify-center gap-4 mb-6 md:mb-2 lg:mb-0">
        <button
          onClick={handleGoogleSignUp}
          className="flex items-center justify-center w-[100%] bg-white border border-gray-300 rounded-lg p-3 text-black font-medium hover:bg-gray-100 transition-all duration-300"
        >
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google"
            className="w-6 h-6 mr-2"
          />
          Sign up with Google
        </button>
      </div>

      <div className="text-center mb-2 mt-2 text-gray-600 md:mb-1 md:mt-1 lg:mb-2 lg:mt-2">Or</div> */}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          className={`${inputStyle} mb-4`}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputPassword name="password" type="password" placeholder="Enter password" state={password} setPassword={setPassword}/>
        <InputPassword name="confirmPassword" type="password" placeholder="New Confirm Password" state={confirmPassword} setPassword={setConfirmPassword}/>

        <button className="w-[40%] bg-purple-500 text-white p-3 rounded-xl text-md hover:bg-purple-600 transition-all duration-300 ease-in-out transform hover:scale-105">
          { loading? "Please wait...": "Sign Up"}
        </button>
      </form>

      <div className="text-gray-600 mt-4">
        Have an account already?{" "}
        <span
          className="text-purple-500 hover:underline cursor-pointer"
          onClick={() => navigate("/")}
        >
          Login
        </span>
      </div>
    </div>
  );
};

export default SignUp;
