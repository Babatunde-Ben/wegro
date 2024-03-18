import { Link } from "react-router-dom";
import Input from "../components/Input";

import { useState } from "react";
import Button from "../components/Button";
// import { ReactComponent as Google } from "../assets/SVGs/google.svg";
const Login = () => {
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFields(() => ({ ...inputFields, [name]: value }));
    console.log(inputFields);
  };
  return (
    <div className="md:max-w-[400px]">
      <p className="text-slate-800 font-semibold text-3xl mb-4">
        Welcome Back,
      </p>
      <p className="text-lg">
        Please sign in to access your account and enjoy the music
      </p>

      <div className="mt-8">
        <div className="mb-5">
          <Input
            type="email"
            label="Email Address"
            name="email"
            handleInputChange={handleInputChange}
            value={inputFields.email}
            placeholder="Enter email address"
            className="!min-w-[370px]"
          />
        </div>
        <div className="">
          <Input
            type="password"
            label="Password"
            name="password"
            handleInputChange={handleInputChange}
            value={inputFields.password}
            placeholder="Enter your password"
            className="!min-w-[370px]"
          />
        </div>
        <div className="w-full flex justify-end mt-2 mb-10">
          <Link to={"/forgot-password"} className="text-right text-sm">
            Forgot Password ?
          </Link>
        </div>
        <div className="w-full h-14">
          <Button variant="primary">Login</Button>
        </div>
        <div className="my-5 flex items-center gap-1 text-slate-700">
          <div className="flex-1 bg-slate-300 h-[1px]"></div>
          OR
          <div className="flex-1 bg-slate-300 h-[1px]"></div>
        </div>
        <button className="text-sm w-full flex items-center justify-center gap-2 border border-slate-800 text-slate-800 py-3 px-10 rounded-3xl outline-none">
          {/* <Google /> */}
          Continue with Google
        </button>
        <div className="mt-5">
          <p className="text-center text-slate-700 text-sm">
            Dont have an account ?{" "}
            <Link to={"/register"} className="font-semibold">
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
