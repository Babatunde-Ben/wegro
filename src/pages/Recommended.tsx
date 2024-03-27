import MusicList from "../components/MusicList";
import RecommendedIcon from "../assets/SVGs/recommended.svg?react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getTrackRecommendationBySeedArtist } from "../utils/backendRequest";

const Recommended = () => {
  const queryClient = useQueryClient();

  const [recommendedTracks, setRecommendedTracks] =
    useState<RecommendedTracksData | null>(null);

  useEffect(() => {
    console.log("fetching effect");
    const fetchData = async () => {
      const data = await queryClient.ensureQueryData<RecommendedTracksData>({
        queryKey: ["recommended-tracks", "0upXUo04k4k8bGVSkmgrSc"],
        queryFn: () =>
          getTrackRecommendationBySeedArtist("0upXUo04k4k8bGVSkmgrSc"),
      });

      setRecommendedTracks(data);
    };

    fetchData();
  }, [queryClient]);
  return (
    <section className=" px-5 min-h-screen md:px-10">
      <div className="flex justify-between items-center mb-5">
        <p className="flex items-center gap-2">
          <span className="text-blue-500">
            <RecommendedIcon />
          </span>
          <span className="text-xl font-semibold text-primary-500">
            Recommended For You
          </span>
        </p>
      </div>

      <div className="">
        {recommendedTracks?.data?.tracks?.map((item) => (
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

export default Recommended;
