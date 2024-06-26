import { useContext, useState } from "react";
// import CardImage from "../assets/images/image-1.jpeg";
import FavouriteIcon from "../assets/SVGs/favourite.svg?react";
import MusicContext from "../contexts/MusicContext";
import { truncateString } from "../utils/format";
// import PlayIcon from "../assets/SVGs/play.svg?react";
// import PauseIcon from "../assets/SVGs/pause.svg?react";

type MusicListProps = {
  id?: string;
  previewURL?: string;
  imageURL?: string;
  trackTitle?: string;
  artist?: string;
};
export const EmptyMusicList = () => {
  return (
    <div className="flex-1 flex gap-3 items-center p-4 py-5">
      <div className=" w-12 h-12 min-w-[48px] bg-white animate-pulse rounded-lg  "></div>
      <div>
        <p className=" mb-2 h-4 w-48 bg-white animate-pulse"></p>
        <p className="  h-4 w-32 bg-white animate-pulse"></p>
      </div>
    </div>
  );
};

const MusicList = ({
  id,
  previewURL,
  imageURL,
  trackTitle,
  artist,
}: MusicListProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { selectedTrack, setSelectedTrack } = useContext(MusicContext);
  const handleLike = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div
      onClick={() =>
        setSelectedTrack({
          id: id,
          artist: artist,
          imageURL: imageURL,
          trackTitle: trackTitle,
          previewURL: previewURL,
        })
      }
      className={`flex items-center gap-8 px-3 py-3 rounded-md mb-2 cursor-pointer sm:px-5 ${
        id === selectedTrack?.id ? "bg-white shadow-sm" : "hover:bg-white/30"
      }`}
    >
      {/* <span className="cursor-pointer text-blue-500">
        {isPlaying ? (
          <PauseIcon className="w-5" onClick={() => {}} />
        ) : (
          <PlayIcon className="w-5" onClick={() => {}} />
        )}
      </span> */}
      <div className="flex-1 flex gap-3 items-center">
        <div className="overflow-hidden w-12 h-12 min-w-[48px] rounded-lg bg-slate-200 ">
          <img src={imageURL} alt="" className="object-cover w-full h-full " />
        </div>
        <div>
          <p className="text-primary-500 font-semibold text-sm mb-2 first-letter:capitalize">
            {truncateString(trackTitle, 40)}
          </p>
          <p className="text-primary-400 font-medium text-xs">
            {truncateString(artist, 40)}
          </p>
        </div>
      </div>

      <span
        onClick={handleLike}
        className={` cursor-pointer stroke-1 ${
          isLiked
            ? "text-red-500 stroke-red-500"
            : "text-transparent stroke-primary-500"
        }`}
      >
        <FavouriteIcon />
      </span>
    </div>
  );
};

export default MusicList;
