import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../assets/SVGs/home.svg?react";
import Logo from "../assets/SVGs/logo.svg?react";
import LogOutIcon from "../assets/SVGs/log-out.svg?react";
import TrendingIcon from "../assets/SVGs/trending.svg?react";
import RecommendedIcon from "../assets/SVGs/recommended.svg?react";
import SearchIcon from "../assets/SVGs/search.svg?react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleNavigate = (navMenu: Navlinks[0]) => {
    navigate(navMenu.path);
    setIsSidebarOpen(false);
  };
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // remove user data from local storage
        localStorage.removeItem("user_data");
        // redirect user to login page
        navigate("/login");
      })
      .catch(() => {
        // An error happened.
      });
  };

  const navLinks: Navlinks = [
    {
      id: 1,
      path: "/home",
      name: "Home",
      svg: <HomeIcon className="w-5" />,
    },
    {
      id: 2,
      path: "/trending",
      name: "Trending",
      svg: <TrendingIcon className="w-5" />,
    },
    {
      id: 3,
      path: "/recommended",
      name: "Recommended",
      svg: <RecommendedIcon className="w-5" />,
    },
    {
      id: 4,
      path: "/search",
      name: "Search",
      svg: <SearchIcon className="w-5" />,
    },
  ];

  return (
    <div
      ref={sidebarRef}
      className={`min-w-[250px] w-[250px] bg-white fixed z-50 shadow-md top-0 left-0 h-screen overflow-y-auto flex flex-col items-center justify-between gap-10 py-10 transition duration-200 md:translate-x-0 ${
        !isSidebarOpen && "-translate-x-full"
      }`}
    >
      <span className="">
        <Logo className="w-40" />
      </span>

      <ul className=" w-full">
        {navLinks.map((item) => (
          <li key={item.id} className="mb-2">
            <label
              onClick={() => handleNavigate(item)}
              className={`w-full h-14 rounded-sm flex justify-start items-center pl-8 gap-2  py-[14px] mb-5 cursor-pointer relative transition duration-150 font-medium ${
                pathname.startsWith(item.path)
                  ? " text-blue-500 before:absolute before:w-2 before:h-full before:bg-blue-500 before:left-0 before:rounded-r-md"
                  : "text-primary-500 hover:text-primary-400 "
              }`}
            >
              <span
                className={`min-w-[32px] min-h-[32px] rounded-md  flex justify-center items-center  `}
              >
                {item.svg}
              </span>
              <p className="capitalize whitespace-nowrap select-none ">
                {item.name}
              </p>
            </label>
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogOut}
        className={` w-full h-14 outline-none border-none inline-flex justify-center items-center gap-4 px-5 py-[14px] mb-2 cursor-pointer text-red-500 font-medium  capitalize whitespace-nowrap select-none  `}
      >
        <span>
          <LogOutIcon />
        </span>
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
