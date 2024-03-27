import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import SearchIcon from "../assets/SVGs/search.svg?react";
import DummyProfile from "../assets/images/dummy-profile.png";
import Logo from "../assets/SVGs/logo.svg?react";
import MobileNavbar from "./MobileNavbar";
import AudioPlayer from "./AudioPlayer";

import { useQuery } from "@tanstack/react-query";
import { getTrackRecommendationBySeedArtist } from "../utils/backendRequest";
import MusicContext from "../contexts/MusicContext";

const ProtectedRoutes = () => {
  const { selectedTrack } = useContext(MusicContext);
  const [searchInput, setSearchInput] = useState("");
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const userDataString = localStorage.getItem("user_data");

  useQuery({
    queryKey: ["recommended-tracks"],
    queryFn: () => getTrackRecommendationBySeedArtist(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // const transformedRecommendedTracks = recommendedTracksData?.data?.tracks?.map(
  //   (item) => ({
  //     previewURL: item?.preview_url,
  //     artist: item?.artists[0]?.name,
  //     trackTitle: item?.name,

  //     imageURL: item?.album?.images[0]?.url,
  //   })
  // );
  // const transformedTrendingTracks = recommendedTracksData?.data?.tracks?.map(
  //   (item) => ({
  //     previewURL: item?.preview_url,
  //     artist: item?.artists[0]?.name,
  //     trackTitle: item?.name,

  //     imageURL: item?.album?.images[0]?.url,
  //   })
  // );

  // useEffect(() => {
  //   if (recommendedTracksData) {
  //     setRecommendedTracks(transformedRecommendedTracks);
  //     setTrendingTracks(transformedTrendingTracks);
  //     console.log("trendingTracks", trendingTracks);
  //   }
  // }, [trendingTracks, recommendedTracks]);

  //   console.log("recommendedTracksData", recommendedTracksData?.data?.tracks);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };

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

      <section className="flex pb-36  md:ml-[250px] lg:mr-80 md:pb-20 lg:pb-0 ">
        <div className="bg-[#f3f3f3] relative flex-1 py-5 md:py-8">
          <div className="px-5 py-6 md:hidden ">
            <Logo className="" />
          </div>
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
        <div className="shadow-md border-b border-primary-100 shadow-primary-100 flex gap-5 p-5 pt-8 ">
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
        <AudioPlayer />
      </section>
      <MobileNavbar />
      <div
        className={`${
          Object.values(selectedTrack).every((value) => Boolean(!value)) &&
          "hidden"
        } h-20 bg-red-300 shadow-sm border-b border-primary-50 w-full fixed z-20 left-0 bottom-16 md:bottom-0 md:pl-[250px] lg:hidden`}
      >
        <AudioPlayer />
      </div>
    </main>
  );
};

export default ProtectedRoutes;
