import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../assets/SVGs/home.svg?react";
import Logo from "../assets/SVGs/logo.svg?react";
import LogOutIcon from "../assets/SVGs/log-out.svg?react";
import TrendingIcon from "../assets/SVGs/hash-tag.svg?react";
import RecommendedIcon from "../assets/SVGs/recommended.svg?react";

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

  //useEffect to close sidebar
  const closeSidebar = useCallback(
    (e: any) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    },
    [isSidebarOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", closeSidebar);
  }, [closeSidebar]);

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
  ];

  return (
    <div
      ref={sidebarRef}
      className={`min-w-[250px] w-[250px] bg-white fixed z-50 top-0 left-0 h-screen overflow-y-auto flex flex-col items-center gap-20 py-10 transition duration-200 md:translate-x-0 ${
        !isSidebarOpen && "-translate-x-full"
      }`}
    >
      <span className="">
        <Logo className="w-40" />
      </span>

      <ul className=" flex-1 w-full">
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
        onClick={() => {
          localStorage.removeItem("access_token");
          navigate("/login");
        }}
        className={`w-full h-14  inline-flex justify-center items-center gap-4 px-5 py-[14px] mb-3 cursor-pointer text-red-500 font-medium  capitalize whitespace-nowrap select-none outline-none hover:border-2  `}
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
