import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchIcon from "../assets/SVGs/search.svg?react";
import DummyProfile from "../assets/images/dummy-profile.png";
import Music1 from "../assets/images/music-1.jpg";
import PlayIcon from "../assets/SVGs/play.svg?react";
import PlayBackIcon from "../assets/SVGs/play-back.svg?react";
import PlayNextIcon from "../assets/SVGs/play-next.svg?react";
import MusicIcon from "../assets/SVGs/music.svg?react";
import MobileNavbar from "./MobileNavbar";

const ProtectedRoutes = () => {
  const userDataString = localStorage.getItem("user_data");

  const [searchInput, setSearchInput] = useState("");
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  //   save user data into a state
  useEffect(() => {
    if (userDataString !== null) {
      setUserData(JSON.parse(userDataString));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   check if user is logged i, if not redirect to login page
  if (!userDataString) {
    return <Navigate to={"/login"} />;
  }
  return (
    <main>
      <Sidebar />

      <section className="flex pb-16  md:ml-[250px] lg:mr-80 md:pb-0 ">
        <div className="bg-[#f3f3f3] flex-1 py-5 md:py-8">
          <div className="px-5 mb-8 flex items-center justify-between  gap-5 md:px-10">
            <div className="bg-white h-14 rounded-full flex-1 shadow-lg shadow-primary-100 flex items-center justify-center gap-2 px-5 text-primary-500 md:px-8">
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
            <div className="relative hidden md:block lg:hidden">
              {isProfileOpen && (
                <div
                  ref={profileRef}
                  className="absolute top-[calc(100%+8px)] right-0 z-10  bg-white shadow-sm min-w-40 py-6 px-5 rounded-lg"
                >
                  <div className=" text-center">
                    <p className="font-semibold whitespace-nowrap mb-1 text-primary-500">
                      {userData?.display_name || "John Doe"}
                    </p>
                    <p className="font-medium text-primary-400 text-sm">
                      Premium User
                    </p>
                  </div>
                </div>
              )}
              <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="shadow-md w-14 h-14 min-w-[56px]  rounded-full overflow-hidden cursor-pointer"
              >
                <img
                  src={userData?.profile_photo || DummyProfile}
                  alt=""
                  className="object-cover w-full h-full "
                />
              </div>
            </div>
          </div>
          <div className="">
            <Outlet />
          </div>
        </div>
      </section>

      <section className="hidden w-80 h-screen fixed right-0 top-0 bg-white  lg:block">
        <div className="shadow-sm shadow-primary-100 flex gap-5 p-5 pt-8 ">
          <div className="overflow-hidden shadow-md w-12 h-12 min-w-[48px] rounded-full  ">
            <img
              src={userData?.profile_photo || DummyProfile}
              alt=""
              className="object-cover w-full h-full "
            />
          </div>
          <div>
            <p className="text-primary-500 font-bold">
              {userData?.display_name || "John Doe"}
            </p>
            <p
              className="text-primary-400 font-medium text-sm
            "
            >
              Premium User
            </p>
          </div>
        </div>
        <div className="px-5 py-10">
          <p className="flex justify-center items-center gap-3 mb-4">
            <span className="text-blue-500">
              <MusicIcon className="w-5" />
            </span>
            <span className="text-primary-500 font-semibold">Now Playing</span>
          </p>
          <div className="overflow-hidden shadow-md w-full h-64 mb-4  rounded-2xl  ">
            <img src={Music1} alt="" className="object-cover w-full h-full" />
          </div>
          <p className="text-lg text-primary-500 text-center mb-1 font-bold">
            Stay home
          </p>
          <p className="text-primary-400 font-medium text-center">
            Justin Christopher
          </p>
          <div className="flex items-center justify-center gap-10 mt-4">
            <button className="cursor-pointer border-none outline-none text-primary-500">
              <PlayBackIcon className="w-5" />
            </button>
            <button className="border-none outline-none w-12 h-12 min-w-[48px] cursor-pointer rounded-full flex items-center justify-center bg-blue-500 text-white transitio duration-100 hover:bg-blue-600">
              <PlayIcon className="w-5" />
            </button>
            <button className="cursor-pointer border-none outline-none text-primary-500">
              <PlayNextIcon className="w-5" />
            </button>
          </div>
        </div>
      </section>
      <MobileNavbar />
    </main>
  );
};

export default ProtectedRoutes;
