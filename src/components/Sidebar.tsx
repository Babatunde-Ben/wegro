import { useCallback, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const pathname = "";

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
      path: "",
      name: "Recommended",
      //   svg: <AvailableSstormIcon />,
    },
    {
      id: 2,
      path: "/trending",
      name: "Trending",
      //   svg: <HailedStromIcon />,
    },
    {
      id: 3,
      path: "/created-sstorm",
      name: "created sstorm",
      //   svg: <CreatedStormIcon />,
    },
  ];

  return (
    <div
      ref={sidebarRef}
      className={`min-w-[220px] w-[220px] fixed z-50 top-0 left-0 h-screen overflow-y-auto flex flex-col items-center gap-12 py-8 transition duration-200 md:translate-x-0 ${
        !isSidebarOpen && "-translate-x-full"
      }`}
    >
      <span className="">
        <h1>Logo</h1>
      </span>
      <ul className="bg-green-500k flex-1 w-full">
        {navLinks.map((item) => (
          <li key={item.id} className="">
            <label
              onClick={() => handleNavigate(item)}
              className={`w-full h-14 rounded-sm flex justify-start items-center gap-4  py-[14px] mb-5 cursor-pointer relative transition duration-150 ${
                pathname.startsWith(item.path)
                  ? "bg-color2-600 text-color1-600  before:absolute before:w-2 before:h-full before:bg-blue-300 before:left-0 before:rounded-r-md"
                  : "text-color2-50 hover:bg-color2-600 hover:bg-red-50"
              }`}
            >
              <span
                className={`min-w-[32px] min-h-[32px] rounded-md  flex justify-center items-center `}
              >
                {item.svg}
              </span>
              <p className="capitalize whitespace-nowrap select-none font-semibold text-primary-500 ">
                {item.name}
              </p>
            </label>
          </li>
        ))}

        <li className="mt-14" onClick={() => navigate("/login")}>
          <button
            onClick={() => {
              localStorage.removeItem("access_token");
            }}
            className={`w-full h-14 rounded-full inline-flex justify-start items-center gap-4 px-4 py-[14px] mb-3 cursor-pointer bg-color2-600 text-color2-200 capitalize whitespace-nowrap select-none outline-none hover:border-2 hover:border-color1-800 `}
          >
            <span>{/* <LogOutIcon /> */}</span>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
