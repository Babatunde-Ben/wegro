import { useState } from "react";
import CardImage from "../assets/images/image-1.jpeg";
import FavouriteIcon from "../assets/SVGs/favourite.svg?react";
import PlayIcon from "../assets/SVGs/play.svg?react";
import PauseIcon from "../assets/SVGs/pause.svg?react";

type MusicListProps = {
  //   image?: string;
  isActive: boolean;
  isPlaying?: boolean;
};

const MusicList = ({ isActive, isPlaying }: MusicListProps) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div
      className={`flex items-center gap-8 px-3 py-3 rounded-md mb-2 sm:px-5 ${
        isActive ? "bg-white" : "hover:bg-white/30"
      }`}
    >
      <span className="cursor-pointer text-blue-500">
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </span>
      <div className="flex-1 flex gap-3 items-center">
        <div className="overflow-hidden w-12 h-12 min-w-[48px] rounded-lg  ">
          <img src={CardImage} alt="" className="object-cover w-full h-full" />
        </div>
        <div>
          <p className="text-primary-500 font-semibold text-sm mb-2">
            Easy on Me
          </p>
          <p className="text-primary-400 font-medium text-xs">Layla</p>
        </div>
      </div>

      <span
        onClick={() => setIsLiked(!isLiked)}
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
