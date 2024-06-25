import MusicCard, { EmptyMusicCard } from "../components/MusicCard";
import MusicList, { EmptyMusicList } from "../components/MusicList";
import BannerImage from "../assets/images/banner-image.jpg";

import TrendingIcon from "../assets/SVGs/trending.svg?react";
import RecommendedIcon from "../assets/SVGs/recommended.svg?react";
import ArrowIcon from "../assets/SVGs/arrow-right.svg?react";
import { useNavigate } from "react-router-dom";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getTrackRecommendationBySeedArtist } from "../utils/backendRequest";

const Home = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const isFetchingRecommendedTracks = useIsFetching({
    queryKey: ["recommended-tracks"],
  });
  const isFetchingTrendingTracks = useIsFetching({
    queryKey: ["trending-tracks"],
  });

  const [recommendedTracks, setRecommendedTracks] = useState<TracksData | null>(
    null
  );
  const [trendingTracks, setTrendingTracks] = useState<TracksData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const recommendedData = await queryClient.ensureQueryData<TracksData>({
        queryKey: ["recommended-tracks", "0upXUo04k4k8bGVSkmgrSc"],
        queryFn: () =>
          getTrackRecommendationBySeedArtist("0upXUo04k4k8bGVSkmgrSc"),
      });
      const trendingData = await queryClient.ensureQueryData<TracksData>({
        queryKey: ["trending-tracks", "46pWGuE3dSwY3bMMXGBvVS"],
        queryFn: () =>
          getTrackRecommendationBySeedArtist("46pWGuE3dSwY3bMMXGBvVS"),
      });

      setRecommendedTracks(recommendedData);
      setTrendingTracks(trendingData);
    };

    fetchData();
  }, [queryClient]);

  return (
    <section className=" px-5 md:px-10">
      <div className="overflow-hidden relative rounded-2xl w-full mb-10">
        {/* {test?.toString()} */}
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

        <div className="grid grid-cols-3 gap-1 sm:gap-4 ">
          {isFetchingTrendingTracks ? (
            <>
              <EmptyMusicCard />
              <EmptyMusicCard />
              <EmptyMusicCard />
            </>
          ) : (
            trendingTracks?.data?.tracks
              ?.slice(0, 3)
              ?.map((item) => (
                <MusicCard
                  key={item?.id}
                  id={item?.id}
                  previewURL={item?.preview_url}
                  artist={item?.artists?.[0]?.name}
                  trackTitle={item?.name}
                  imageURL={item?.album?.images?.[0]?.url}
                />
              ))
          )}
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
          {isFetchingRecommendedTracks ? (
            <>
              <EmptyMusicList />
              <EmptyMusicList />
              <EmptyMusicList />
            </>
          ) : (
            recommendedTracks?.data?.tracks
              ?.slice(0, 3)
              ?.map((item) => (
                <MusicList
                  key={item?.id}
                  previewURL={item?.preview_url}
                  artist={item?.artists?.[0]?.name}
                  trackTitle={item?.name}
                  id={item?.id}
                  imageURL={item?.album?.images?.[0]?.url}
                />
              ))
          )}

          {/* <MusicList isActive={true} />
          <MusicList isActive={false} /> */}
        </div>
      </div>
    </section>
  );
};

export default Home;
