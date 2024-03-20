import MusicCard from "../components/MusicCard";
import MusicList from "../components/MusicList";
import BannerImage from "../assets/images/banner-image.jpg";

import TrendingIcon from "../assets/SVGs/hash-tag.svg?react";
import RecommendedIcon from "../assets/SVGs/recommended.svg?react";
import ArrowIcon from "../assets/SVGs/arrow-right.svg?react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getTrackRecommendationBySeedArtist,
  getTracksByID,
} from "../utils/backendRequest";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();

  const { data: trackByID } = useQuery({
    queryKey: ["tracks"],
    queryFn: () => getTracksByID(),
  });
  const { data: trackByRecommendation } = useQuery({
    queryKey: ["tracks-recommended"],
    queryFn: () => getTrackRecommendationBySeedArtist(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  // console.log("usequery trackByID", trackByID);
  console.log(
    "usequery trackByRecommendation",
    trackByRecommendation?.data?.tracks?.slice(0, 3)
  );

  const [audio] = useState(
    new Audio(
      "https://p.scdn.co/mp3-preview/92479d43666b31ca72b7e2a4fad74568f98ee41e?cid=d8a5ed958d274c2e8ee717e6a4b0971d"
    )
  );

  return (
    <section className=" px-5 md:px-10">
      <div
        onClick={() => audio.play()}
        className="overflow-hidden relative rounded-2xl w-full mb-10"
      >
        <img
          src={BannerImage}
          alt=""
          className="object-cover w-full h-48 sm:h-56 md:h-64"
        />
        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent via-black/50 to-black/90 flex flex-col justify-end p-5 md:p-8">
          <div>
            <p className="flex items-center gap-2 text-slate-100 mb-2 text-xs uppercase font-medium md:text-sm">
              {" "}
              <span className="w-2 h-2 inline-block rounded-full   bg-red-600"></span>
              <span>Exclusive</span>
            </p>
            <p className="text-lg font-bold  text-white uppercase md:mb-2 md:text-2xl ">
              Jezzy Concert 2024
            </p>
            <p className=" text-slate-100 text-sm lg:w-3/5 ">
              Listen to live music concert directly through our free streaming
            </p>
          </div>
        </div>
      </div>
      <div className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <p className="flex items-center gap-2">
            <span className="text-blue-500">
              <TrendingIcon className="w-6" />
            </span>
            <span className="text-xl font-bold text-primary-500">Trending</span>
          </p>
          <p
            onClick={() => navigate("/trending")}
            className="flex items-center gap-2 cursor-pointer text-blue-500 text-sm hover:text-blue-400"
          >
            <span className=" font-semibold capitalize">show more</span>{" "}
            <span>
              <ArrowIcon className="w-4" />
            </span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 ">
          <MusicCard />
          <MusicCard />
          <MusicCard />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-5">
          <p className="flex items-center gap-2">
            <span className="text-blue-500">
              <RecommendedIcon className="w-6" />
            </span>
            <span className="text-xl font-bold text-primary-500">
              Recommended
            </span>
          </p>
          <p
            onClick={() => navigate("/recommended")}
            className="flex items-center gap-2 cursor-pointer text-blue-500 text-sm hover:text-blue-400"
          >
            <span className=" font-semibold capitalize">show more</span>{" "}
            <span>
              <ArrowIcon className="w-4" />
            </span>
          </p>
        </div>

        <div className="">
          {trackByRecommendation?.data?.tracks?.slice(0, 3)?.map((item) => (
            <MusicList
              isActive={false}
              musicURL={item?.preview_url}
              artist={item?.artists[0]?.name}
              songTitle={item?.name}
              key={item?.id}
              imageURL={item?.album?.images[0]?.url}
            />
          ))}
          {/* <MusicList isActive={true} />
          <MusicList isActive={false} /> */}
        </div>
      </div>
    </section>
  );
};

export default Home;
