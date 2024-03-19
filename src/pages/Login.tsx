import { Link } from "react-router-dom";
import Input from "../components/Input";

import { useState } from "react";
import Button from "../components/Button";
import Google from "../assets/SVGs/google.svg?react";
import Logo from "../assets/SVGs/logo.svg?react";

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
    <div className="sm:max-w-[450px] sm:mx-auto md:mx-0">
      <Logo className="mb-5" />
      <p className="text-primary-500 font-bold text-xl mb-4">Welcome Back,</p>
      <p className="font-medium text-primary-400 mb-10">
        Please log in to access your account and enjoy the music
      </p>

      <div className="">
        <div className="mb-5">
          <Input
            type="email"
            label="Email Address"
            name="email"
            handleInputChange={handleInputChange}
            value={inputFields.email}
            placeholder="Enter email address"
          />
        </div>
        <div className="mb-5">
          <Input
            type="password"
            label="Password"
            name="password"
            handleInputChange={handleInputChange}
            value={inputFields.password}
            placeholder="Enter your password"
          />
        </div>

        <div className="w-full h-14 mt-10">
          <Button variant="primary">Login</Button>
        </div>
        <div className="my-5 flex items-center gap-1 text-slate-700">
          <div className="flex-1 bg-slate-300 h-[1px]"></div>
          OR
          <div className="flex-1 bg-slate-300 h-[1px]"></div>
        </div>
        <div className="w-full h-14">
          <Button variant="secondary">
            <Google />
            <span>Continue with Google</span>
          </Button>
        </div>

        <div className="my-5">
          <p className="text-center text-slate-700 text-sm">
            Dont have an account?{" "}
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
