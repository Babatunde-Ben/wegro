import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";

import { useState } from "react";
import Button from "../components/Button";
import Google from "../assets/SVGs/google.svg?react";
import Logo from "../assets/SVGs/logo.svg?react";
import { auth, googleProvider } from "../utils/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [isAuthenticatingPassword, setIsAuthenticatingPassword] =
    useState(false);
  const [isAuthenticatingGoogle, setIsAuthenticatingGoogle] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFields(() => ({ ...inputFields, [name]: value }));
    console.log(inputFields);
  };

  // function to login user via google authentication
  const handleGoggleAuth = () => {
    setIsAuthenticatingGoogle(true);
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setIsAuthenticatingGoogle(false);

        // clear error message
        setErrorMessage("");

        // reset input fields
        setInputFields({
          email: "",
          password: "",
        });

        // console.log("google auth response", res);
        // console.log("google token", res?.user?.accessToken);

        // save user data to browser local storage
        const userData = {
          //   access_token: res?.user?.accessToken,
          display_name: res?.user?.displayName,
          profile_photo: res?.user?.photoURL,
        };
        localStorage.setItem("user_data", JSON.stringify(userData));
        // redirect to home page
        navigate("/home");
      })
      .catch((error) => {
        setIsAuthenticatingGoogle(false);

        console.log("google auth error", error);
        setErrorMessage("Error authenticatng user");
      });
  };

  //   function to login user via via email and password
  const handleUserLogin = () => {
    setIsAuthenticatingPassword(true);
    signInWithEmailAndPassword(auth, inputFields.email, inputFields.password)
      .then((userCredential) => {
        // clear error message
        setErrorMessage("");

        setIsAuthenticatingPassword(false);

        // reset input fields
        setInputFields({
          email: "",
          password: "",
        });

        // Signed up
        const user = userCredential?.user;
        // console.log("login user ", user);

        // save user data to browser local storage
        const userData = {
          //   access_token: user?.accessToken,
          display_name: user?.displayName,
          profile_photo: user?.photoURL,
        };
        localStorage.setItem("user_data", JSON.stringify(userData));

        // redirect to home page
        navigate("/home");
        // ...
      })
      .catch((error) => {
        setIsAuthenticatingPassword(false);

        // const errorCode = error.code;
        const errorMessage = error.message;

        const formattedErrorMessage = errorMessage
          .substring(errorMessage.indexOf("/") + 1, errorMessage.indexOf(")"))
          .replaceAll("-", " ");
        setErrorMessage(formattedErrorMessage);
      });
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
        {!!errorMessage && (
          <div className="text-left bg-red-100 py-2 px-5 rounded-lg">
            <p className="text-red-600 text-sm font-medium first-letter:capitalize">
              {errorMessage}
              {/* Lorem ipsum dolor sit amet */}
            </p>
          </div>
        )}
        <div className="w-full h-14 mt-10">
          <Button
            variant="primary"
            isLoading={isAuthenticatingPassword}
            disabled={
              !inputFields.email ||
              !inputFields.password ||
              isAuthenticatingPassword ||
              isAuthenticatingGoogle
            }
            onClick={handleUserLogin}
          >
            Login
          </Button>
        </div>
        <div className="my-5 flex items-center gap-5 text-slate-700">
          <div className="flex-1 bg-primary-300 h-[1px]"></div>
          OR
          <div className="flex-1 bg-primary-300 h-[1px]"></div>
        </div>
        <div className="w-full h-14">
          <Button
            variant="secondary"
            onClick={handleGoggleAuth}
            disabled={isAuthenticatingPassword || isAuthenticatingGoogle}
          >
            <Google />
            <span>Continue with Google</span>
          </Button>
        </div>

        <div className="my-5">
          <p className="text-center text-slate-700 text-sm">
            Don't have an account?{" "}
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
