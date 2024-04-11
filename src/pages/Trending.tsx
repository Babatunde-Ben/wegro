import MusicList from "../components/MusicList";
import TrendingIcon from "../assets/SVGs/trending.svg?react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getTrackRecommendationBySeedArtist } from "../utils/backendRequest";

const Trending = () => {
  const queryClient = useQueryClient();

  const [trendingTracks, setTrendingTracks] = useState<TracksData | null>(null);

  useEffect(() => {
    console.log("fetching effect");
    const fetchData = async () => {
      const data = await queryClient.ensureQueryData<TracksData>({
        queryKey: ["trending-tracks", "46pWGuE3dSwY3bMMXGBvVS"],
        queryFn: () =>
          getTrackRecommendationBySeedArtist("46pWGuE3dSwY3bMMXGBvVS"),
      });

      setTrendingTracks(data);
    };

    fetchData();
  }, [queryClient]);
  return (
    <section className=" px-5 min-h-screen md:px-10">
      <div className="flex justify-between items-center mb-5">
        <p className="flex items-center gap-2">
          <span className="text-blue-500">
            <TrendingIcon />
          </span>
          <span className="text-xl font-semibold text-primary-500">
            Trending
          </span>
        </p>
      </div>

      <div className="">
        {trendingTracks?.data?.tracks?.map((item) => (
          <MusicList
            key={item?.id}
            previewURL={item?.preview_url}
            artist={item?.artists?.[0]?.name}
            trackTitle={item?.name}
            id={item?.id}
            imageURL={item?.album?.images?.[0]?.url}
          />
        ))}
      </div>
    </section>
  );
};

export default Trending;
