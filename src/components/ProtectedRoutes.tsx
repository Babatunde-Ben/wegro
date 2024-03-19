import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchIcon from "../assets/SVGs/search.svg?react";
import ProfileImage from "../assets/images/image-1.jpeg";

const ProtectedRoutes = () => {
  const [isLoggedIn] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <main>
      <Sidebar />

      <section className="flex  md:ml-[250px] lg:mr-80 ">
        <div className="bg-[#f3f3f3] flex-1 py-5 md:py-8">
          <div className="px-5 mb-8 md:px-10">
            <div className="bg-white h-14 rounded-full shadow-lg shadow-primary-100 flex items-center justify-center gap-2 px-5 text-primary-500 md:px-8">
              <span>
                <SearchIcon />
              </span>
              <input
                type="text"
                name="search"
                value={searchInput}
                onChange={handleInputChange}
                className={` w-full h-full flex-1 text-sm p-3.5 py-3 rounded-md outline-none border-none font-medium  bg-transparent  placeholder:font-medium placeholder:text-sm placeholder:text-primary-200  `}
                placeholder="Search.."
              />
            </div>
          </div>
          <div className="">
            <Outlet />
          </div>
        </div>
      </section>

      <section className="hidden w-80 h-screen fixed right-0 top-0 bg-white  lg:block">
        <div className="shadow-md flex gap-5 p-5 pt-8 ">
          <div className="overflow-hidden shadow-md w-12 h-12 min-w-[48px] rounded-full  ">
            <img
              src={ProfileImage}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <p className="text-primary-500 font-bold">John Doe</p>
            <p
              className="text-primary-400 font-medium text-sm
            "
            >
              Free User
            </p>
          </div>
        </div>
        <div className="px-5 py-10">
          <div className="overflow-hidden shadow-md w-full h-64 mb-4  rounded-2xl  ">
            <img
              src={ProfileImage}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-lg text-primary-500 text-center mb-1 font-bold">
            Stay home
          </p>
          <p className="text-primary-400 font-medium text-center">
            Justin Christopher
          </p>
          <div className="flex items-center justify-center gap-10 mt-4">
            <button className="cursor-pointer border-none outline-none">
              <SearchIcon />
            </button>
            <button className="border-none outline-none w-12 h-12 min-w-[48px] cursor-pointer rounded-full flex items-center justify-center bg-blue-500 text-white transitio duration-100 hover:bg-blue-600">
              <SearchIcon />
            </button>
            <button className="cursor-pointer border-none outline-none">
              <SearchIcon />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProtectedRoutes;
