import Music1 from "../assets/images/music-1.jpg";
import PlayIcon from "../assets/SVGs/play.svg?react";
import PlayBackIcon from "../assets/SVGs/play-back.svg?react";
import PlayNextIcon from "../assets/SVGs/play-next.svg?react";
import MusicIcon from "../assets/SVGs/music.svg?react";
const AudioPlayer = () => {
  return (
    <div className="px-5 h-full bg-white flex gap-4 items-center justify-evenly sm:px-8 lg:px-5 lg:flex-col lg:justify-start lg:py-10 lg:h-fit">
      <p className="hidden lg:flex justify-center items-center gap-3 ">
        <span className="text-blue-500">
          <MusicIcon className="w-5" />
        </span>
        <span className="text-primary-500 font-semibold">Now Playing</span>
      </p>
      <div className="overflow-hidden shadow-md w-12 h-12 min-w-12 rounded-2xl lg:w-full lg:h-64 ">
        <img src={Music1} alt="" className="object-cover w-full h-full" />
      </div>
      <div className="flex-1 lg:text-center">
        <p className=" text-primary-500 mb-1 font-bold md:text-lg">Stay home</p>
        <p className="text-primary-400 font-medium text-sm md:text-base ">
          Justin Christopher
        </p>
      </div>
      <div className="flex items-center justify-center gap-10 ">
        <button className="cursor-pointer border-none outline-none text-primary-200 hidden lg:inline-block">
          <PlayBackIcon className="w-5" />
        </button>
        <button className="border-none outline-none w-10 h-10 min-w-[40px] cursor-pointer rounded-full flex items-center justify-center bg-blue-500 text-white transitio duration-100 md:w-12 md:h-12 md:min-w-[48px] hover:bg-blue-600">
          <PlayIcon className="w-4 lg:w-5" />
        </button>
        <button className="cursor-pointer border-none outline-none text-primary-200 hidden lg:inline-block">
          <PlayNextIcon className="w-5" />
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
