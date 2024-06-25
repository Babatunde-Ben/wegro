import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DummyProfile from "../assets/SVGs/dummy-profile.svg?react";
import Logo from "../assets/SVGs/logo.svg?react";
import MobileNavbar from "./MobileNavbar";
import AudioPlayer from "./AudioPlayer";

import { useQuery } from "@tanstack/react-query";
import { getTrackRecommendationBySeedArtist } from "../utils/backendRequest";
import MusicContext from "../contexts/MusicContext";

const ProtectedRoutes = () => {
  const { selectedTrack } = useContext(MusicContext);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const userDataString = localStorage.getItem("user_data");

  useQuery({
    queryKey: ["recommended-tracks", "0upXUo04k4k8bGVSkmgrSc"],
    queryFn: () => getTrackRecommendationBySeedArtist("0upXUo04k4k8bGVSkmgrSc"),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  useQuery({
    queryKey: ["trending-tracks", "46pWGuE3dSwY3bMMXGBvVS"],
    queryFn: () => getTrackRecommendationBySeedArtist("46pWGuE3dSwY3bMMXGBvVS"),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  //   save user data into a state variable
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

      <section
        className={`flex min-h-screen  md:ml-[250px] lg:mr-80 md:pb-20 lg:pb-0 ${
          Object.values(selectedTrack).every((value) => Boolean(!value))
            ? "pb-16"
            : "pb-36"
        }`}
      >
        <div className="bg-[#f3f3f3] relative flex-1 py-5 md:py-10 lg:pt-5">
          <div className="px-5 py-6 md:hidden ">
            <Logo className="" />
          </div>
          <div className="px-5 mb-8 flex items-center justify-end  gap-5 md:px-10">
            <div className="relative hidden md:block lg:hidden">
              {isProfileOpen && (
                <div
                  ref={profileRef}
                  className="absolute top-[calc(100%+8px)] right-0 z-10  bg-white shadow-sm min-w-40 py-6 px-5 rounded-lg"
                >
                  <div className=" text-center">
                    <p className="font-semibold whitespace-nowrap mb-1 text-primary-500">
                      {userData?.display_name || "Welcome"}
                    </p>
                    <p className="font-medium text-primary-400 text-sm">
                      Premium User
                    </p>
                  </div>
                </div>
              )}
              <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="shadow-md w-14 h-14 min-w-[56px] border border-gray-200  rounded-full flex justify-center items-center overflow-hidden cursor-pointer"
              >
                {userData?.profile_photo ? (
                  <img
                    src={userData?.profile_photo}
                    alt=""
                    className="object-cover w-full h-full "
                  />
                ) : (
                  <DummyProfile className="w-10" />
                )}
              </div>
            </div>
          </div>
          <div className="">
            <Outlet />
          </div>
        </div>
      </section>

      <section className="hidden w-80 h-screen fixed right-0 top-0 bg-white  lg:block">
        <div className="shadow-md border-b border-primary-100 shadow-primary-100 flex gap-5 p-5 pt-12 ">
          <div className="overflow-hidden border border-gray-100 shadow-md w-12 h-12 min-w-[48px] flex justify-center items-center rounded-full  ">
            {userData?.profile_photo ? (
              <img
                src={userData?.profile_photo}
                alt=""
                className="object-cover w-full h-full "
              />
            ) : (
              <DummyProfile className="w-10 " />
            )}
          </div>
          <div>
            <p className="text-primary-500 font-bold">
              {userData?.display_name || "Welcome"}
            </p>
            <p
              className="text-primary-400 font-medium text-sm
            "
            >
              Premium User
            </p>
          </div>
        </div>
        <AudioPlayer />
      </section>
      <MobileNavbar />
      <div
        className={`${
          Object.values(selectedTrack).every((value) => Boolean(!value)) &&
          "hidden"
        } h-20 shadow-sm border-b border-primary-50 w-full fixed z-20 left-0 bottom-16 md:bottom-0 md:pl-[250px] lg:hidden`}
      >
        <AudioPlayer />
      </div>
    </main>
  );
};

export default ProtectedRoutes;
