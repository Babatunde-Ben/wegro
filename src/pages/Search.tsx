import { useState } from "react";
import SearchIcon from "../assets/SVGs/search.svg?react";
import useDebounce from "../utils/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { searchTracks } from "../utils/backendRequest";
import MusicList, { EmptyMusicList } from "../components/MusicList";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const searchParam = useDebounce(searchInput, 600);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search-tracks", searchParam],
    queryFn: () => searchTracks(searchParam),
    enabled: !!searchParam.length,
  });

  //   console.log("search result", searchResults?.data?.tracks?.items);
  console.log("search result", searchResults?.data?.tracks?.items);

  return (
    <section className=" px-5 md:px-10">
      <div className="mb-10 bg-white h-14 rounded-full flex-1 shadow-lg shadow-primary-100 flex items-center justify-center gap-2 px-5 text-primary-500 md:px-8">
        <span>
          <SearchIcon />
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
            searchResults?.data?.tracks?.items?.map((item) => (
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
    </section>
  );
};

export default Search;
