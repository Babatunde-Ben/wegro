import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "../assets/SVGs/home.svg?react";
import DummyProfile from "../assets/SVGs/dummy-profile.svg?react";
import LogOutIcon from "../assets/SVGs/log-out.svg?react";
import TrendingIcon from "../assets/SVGs/trending.svg?react";
import RecommendedIcon from "../assets/SVGs/recommended.svg?react";
import SearchIcon from "../assets/SVGs/search.svg?react";
import { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const MobileNavbar = () => {
  const userDataString = localStorage.getItem("user_data");

  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const pathname = location.pathname;
  const navLinks: Navlinks = [
    {
      id: 1,
      path: "/home",
      name: "Home",
      svg: <HomeIcon className="w-6" />,
    },
    {
      id: 2,
      path: "/trending",
      name: "Trending",
      svg: <TrendingIcon className="w-6" />,
    },
    {
      id: 3,
      path: "/recommended",
      name: "Recommended",
      svg: <RecommendedIcon className="w-6" />,
    },
    {
      id: 4,
      path: "/search",
      name: "Search",
      svg: <SearchIcon className="w-6" />,
    },
  ];

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // remove user data from local storage
        localStorage.removeItem("user_data");
        setIsProfileOpen(false);
        // redirect user to login page
        navigate("/login");
      })
      .catch(() => {
        // An error happened.
      });
  };

  // useCallback to close sidebar
  //   const closeProfile = useCallback(
  //     (e: MouseEvent) => {
  //       if (
  //         profileRef.current &&
  //         !profileRef.current.contains(e.target as Node)
  //       ) {
  //         setIsProfileOpen(false);
  //       }
  //     },
  //     [isProfileOpen]
  //   );

  //   useEffect(() => {
  //         if (isProfileOpen) {
  //       document.addEventListener("mousedown", closeProfile);
  //     } else {
  //       document.removeEventListener("mousedown", closeProfile);
  //     }
  //     return () => {
  //       document.removeEventListener("mousedown", closeProfile);
  //     };
  //   }, [closeProfile, isProfileOpen]);

  //   save user data into a state
  useEffect(() => {
    if (userDataString !== null) {
      setUserData(JSON.parse(userDataString));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <nav className="bg-white shadow-md  w-full h-16 fixed right-0 bottom-0 z-30 md:left-[250px] md:hidden">
      {isProfileOpen && (
        <div
          ref={profileRef}
          className="absolute -top-36 right-5  bg-white min-w-40 py-4 px-4 shadow-sm rounded-lg z-50"
        >
          <div className="mb-5 text-center shadow-sm pb-3">
            <p className="font-semibold whitespace-nowrap mb-1 text-primary-500">
              {userData?.display_name || "John Doe"}
            </p>
            <p className="font-medium text-primary-400 text-sm">Premium User</p>
          </div>
          <div
            onClick={handleLogOut}
            className="cursor-pointer text-red-500 flex justify-center gap-2 "
          >
            <span>
              <LogOutIcon className="w-4s" />
            </span>
            <span className="font-medium text-sm">Log Out</span>
          </div>
        </div>
      )}
      <ul className="  flex justify-evenly items-center w-full h-full   ">
        {navLinks.map((item) => (
          <li
            key={item.id}
            onClick={() => navigate(item.path)}
            className={` cursor-pointer
          ${
            pathname.startsWith(item.path)
              ? "text-blue-500"
              : "text-primary-500"
          }
        `}
          >
            <span>{item.svg}</span>
            {/* <span>{item.name}</span> */}
          </li>
        ))}

        <li>
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="shadow-md w-8 h-8 min-w-[32px] flex justify-center items-center rounded-full overflow-hidden cursor-pointer"
          >
            {userData?.profile_photo ? (
              <img
                src={userData?.profile_photo}
                alt=""
                className="object-cover w-full h-full "
              />
            ) : (
              <DummyProfile />
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavbar;
