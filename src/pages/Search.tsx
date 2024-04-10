import { useEffect, useState } from "react";
import SearchIcon from "../assets/SVGs/search.svg?react";
import RecommendedIcon from "../assets/SVGs/recommended.svg?react";
import ArrowIcon from "../assets/SVGs/arrow-right.svg?react";
import useDebounce from "../utils/useDebounce";
import { useIsFetching, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTrackRecommendationBySeedArtist,
  searchTracks,
} from "../utils/backendRequest";
import MusicList, { EmptyMusicList } from "../components/MusicList";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isFetchingRecommendedTracks = useIsFetching({
    queryKey: ["recommended-tracks"],
  });

  const [searchInput, setSearchInput] = useState("");
  const [recommendedTracks, setRecommendedTracks] = useState<TracksData | null>(
    null
  );
  const searchParam = useDebounce(searchInput, 600);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  const {
    data: searchResults,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["search-tracks", searchParam],
    queryFn: () => searchTracks(searchParam),
    // enabled: !!searchInput.length,
    enabled: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (searchParam.length) {
      refetch();
    }
  }, [searchParam, refetch]);
  useEffect(() => {
    console.log("fetching effect");
    const fetchData = async () => {
      const recommendedData = await queryClient.ensureQueryData<TracksData>({
        queryKey: ["recommended-tracks", "0upXUo04k4k8bGVSkmgrSc"],
        queryFn: () =>
          getTrackRecommendationBySeedArtist("0upXUo04k4k8bGVSkmgrSc"),
      });

      setRecommendedTracks(recommendedData);
    };

    fetchData();
  }, [queryClient]);

  return (
    <section className=" px-5 md:px-10">
      <div className="mb-10 bg-white h-14 rounded-full flex-1 shadow-lg shadow-primary-100 flex items-center justify-center gap-2 px-5 text-primary-500 md:px-8">
        <span>
          <SearchIcon className="w-6" />
        </span>
        <input
          type="text"
          name="search"
          value={searchInput}
          onChange={handleInputChange}
          className={` w-full h-full flex-1 text-sm p-3.5 py-3 rounded-md outline-none border-none font-medium  bg-transparent  placeholder:font-medium placeholder:text-sm placeholder:text-primary-200  `}
          placeholder="Search songs.."
        />
      </div>
      <div className="">
        {!!searchParam && (
          <p className="text-primary-500 mb-10">
            Showing results for{" "}
            <span className="font-semibold">{searchParam}</span>{" "}
          </p>
        )}
        <div className="">
          {isLoading ? (
            <>
              <EmptyMusicList />
              <EmptyMusicList />
              <EmptyMusicList />
            </>
          ) : (
            searchResults?.data?.tracks?.items?.map((item: TracksSearch) => (
              //   <p>te</p>
              <MusicList
                key={item?.data?.id}
                // previewURL={item?.preview_url}
                artist={item?.data?.artists?.items?.[0]?.profile?.name}
                trackTitle={item?.data?.name}
                id={item?.data?.id}
                imageURL={item?.data?.albumOfTrack?.coverArt?.sources?.[0]?.url}
              />
            ))
          )}
        </div>
      </div>
      {!searchParam.length && (
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
                ?.slice(0, 6)
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
      )}
    </section>
  );
};

export default Search;
