import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import Input from "../components/Input";
import Google from "../assets/SVGs/google.svg?react";
import Logo from "../assets/SVGs/logo.svg?react";

const Register = () => {
  const [inputFields, setInputFields] = useState({
    first_name: "",
    last_name: "",
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
      <p className="text-primary-500 font-bold text-xl mb-4">
        Join our music community today!
      </p>
      <p className="font-medium text-primary-400 mb-10">
        Create your account to unlock exclusive features and discover endless
        melodies
      </p>

      <div className="">
        <div className="mb-5 flex gap-2 items-center">
          <div>
            <Input
              type="text"
              label="First Name"
              name="first_name"
              handleInputChange={handleInputChange}
              value={inputFields.first_name}
              placeholder="Enter first name"
            />
          </div>
          <div>
            <Input
              type="text"
              label="Last Name"
              name="last_name"
              handleInputChange={handleInputChange}
              value={inputFields.last_name}
              placeholder="Enter last name"
            />
          </div>
        </div>
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

        <div className="w-full mt-10 h-14">
          <Button variant="primary">Register</Button>
        </div>
        <div className="my-5 flex items-center gap-1 text-slate-700">
          <div className="flex-1 bg-slate-300 h-[1px]"></div>
          OR
          <div className="flex-1 bg-slate-300 h-[1px]"></div>
        </div>
        <div className="w-full h-14">
          <Button variant="secondary">
            <Google />
            <span> Continue with Google</span>
          </Button>
        </div>

        <div className="my-5">
          <p className="text-center text-slate-700 text-sm">
            Have an account already?{" "}
            <Link to={"/login"} className="font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
