import { useNavigate } from "react-router-dom";
import PageNotFoundIcon from "../assets/SVGs/404.svg?react";
import ArrowIcon from "../assets/SVGs/arrow-right.svg?react";
import Logo from "../assets/SVGs/logo.svg?react";
import Button from "../components/Button";

const Error = () => {
  const navigate = useNavigate();
  return (
    <main className=" min-h-screen text-center overflow-hidden px-5 pt-14 pb-14 sm:px-10 md:px-16 lg:px-28 ">
      <div className=" mx-auto ">
        <div>
          <Logo
            onClick={() => navigate("/home")}
            className="w-32 cursor-pointer"
          />
        </div>

        <span className="inline-block mx-auto mt-7 mb-9 ">
          <PageNotFoundIcon />
        </span>
        <p className="font-bold text-primary-500 mb-4 text-2xl md:text-4xl">
          Oops! Page Not Found
        </p>
        <p className="text-lg text-primary-500 mb-12 md:text-xl">
          We couldn't find the page you're looking for. Let's get you back on
          track.
        </p>
        <span className="h-14 w-60 inline-block">
          <Button variant="primary" onClick={() => navigate("/home")}>
            <span>Go to Homepage</span>
            <span className="text-white inline-block">
              <ArrowIcon className="w-4" />
            </span>
          </Button>
        </span>
      </div>
    </main>
  );
};

export default Error;
