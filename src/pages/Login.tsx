import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      Welcome to login page{" "}
      <Link to={"/register"} className="text-red-300 font-bold">
        Register
      </Link>
    </div>
  );
};

export default Login;
