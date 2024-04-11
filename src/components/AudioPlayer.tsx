import MusicDisc from "../assets/images/music-disc.jpg";
import ButtonLoaderIcon from "../assets/SVGs/button-loader.svg?react";
import PlayIcon from "../assets/SVGs/play.svg?react";
import PauseIcon from "../assets/SVGs/pause.svg?react";
import PlayBackIcon from "../assets/SVGs/play-back.svg?react";
import PlayNextIcon from "../assets/SVGs/play-next.svg?react";
import MusicIcon from "../assets/SVGs/music.svg?react";
import { useContext, useEffect } from "react";
import MusicContext from "../contexts/MusicContext";
import StringCarousel from "./StringCarousel";

const AudioPlayer = () => {
  const {
    selectedTrack,
    currentTime,
    duration,
    isFetchingTrack,
    isPlaying,
    setIsPlaying,
    togglePlay,
    handleSeek,
  } = useContext(MusicContext);

  // const audioRef = useRef<HTMLAudioElement>(null);
  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // const [duration, setDuration] = useState<number>(0);
  // const [currentTime, setCurrentTime] = useState<number>(0);

  // const {
  //   data: track,
  //   isLoading: isFetchingTrack,
  //   refetch: fetchTrack,
  // } = useQuery({
  //   queryKey: ["get-track", selectedTrack?.id],
  //   queryFn: () => getTrack(selectedTrack?.id),
  //   enabled: false,
  //   retry: false,
  // });
  // console.log("new search track ", track?.data?.tracks[0]?.preview_url);

  // useEffect(() => {
  //   if (!selectedTrack?.previewURL && selectedTrack) fetchTrack();
  // }, [selectedTrack,fetchTrack]);

  useEffect(() => {
    setIsPlaying(false);
  }, [selectedTrack]);

  // const togglePlay = () => {
  //   if (selectedTrack?.previewURL || track?.data?.tracks[0]?.preview_url) {
  //     if (audioRef.current) {
  //       if (isPlaying) {
  //         audioRef.current.pause();
  //       } else {
  //         audioRef.current.play();
  //       }
  //       setIsPlaying(!isPlaying);
  //     }
  //   } else {
  //     fetchTrack();
  //   }
  // };

  // const handleLoadedMetadata = () => {
  //   if (audioRef.current) {
  //     setDuration(audioRef.current.duration);
  //   }
  // };

  // const handleTimeUpdate = () => {
  //   if (audioRef.current) {
  //     setCurrentTime(audioRef.current.currentTime);
  //   }
  // };

  // const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const time = parseFloat(e.target.value);
  //   if (audioRef.current) {
  //     audioRef.current.currentTime = time;
  //   }
  //   setCurrentTime(time);
  // };

  return (
    <div className="relative px-5 h-full bg-white flex gap-4 items-center justify-evenly sm:px-8 lg:px-5 lg:flex-col lg:justify-start lg:py-10 lg:h-fit">
      <span className="absolute bottom-[calc(100%-10px)]  w-full lg:hidden ">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          style={{
            background: `linear-gradient(to right, #3b82fc ${
              (currentTime / duration) * 100
            }%, #ddd ${(currentTime / duration) * 100}%)`,
          }}
          className="custom-slider-2 flex-1 outline-none border-none
               p-0 rounded-full h-1 w-full "
        />
      </span>
      <p className="hidden lg:flex justify-center items-center gap-3 ">
        <span className="text-blue-500">
          <MusicIcon className="w-5" />
        </span>
        <span className="text-primary-500 font-semibold">Now Playing</span>
      </p>

      <div className="overflow-hidden shadow-md w-12 h-12 min-w-12 rounded-2xl lg:w-full lg:h-52 ">
        <img
          src={selectedTrack?.imageURL || MusicDisc}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      {(Object.values(selectedTrack).every((value) => Boolean(value)) ||
        !selectedTrack?.previewURL) && (
        <>
          <div className=" overflow-hidden w-full flex-1 lg:text-center ">
            <p className=" text-primary-500 mb-1 font-bold md:text-lg">
              {/* {selectedTrack?.trackTitle} */}
              <StringCarousel maxLength={24} text={selectedTrack?.trackTitle} />
            </p>
            <p className="text-primary-400 font-medium text-sm md:text-base ">
              {/* {selectedTrack?.artist} */}
              <StringCarousel maxLength={24} text={selectedTrack?.artist} />
            </p>
          </div>
          <div className=" items-center justify-center gap-3 w-full my-4 hidden lg:flex">
            <span className="text-primary-500 font-medium text-sm">
              {Math.floor(currentTime / 60)}:
              {String(Math.floor(currentTime % 60)).padStart(2, "0")}
            </span>

            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              style={{
                background: `linear-gradient(to right, #3b82fc ${
                  (currentTime / duration) * 100
                }%, #ddd ${(currentTime / duration) * 100}%)`,
              }}
              className="custom-slider flex-1 outline-none
              appearance-none  rounded-full h-[6px] w-full "
            />

            <span className="text-primary-500 font-medium text-sm">
              {Math.floor(duration / 60)}:
              {String(Math.floor(duration % 60)).padStart(2, "0")}
            </span>
          </div>
          <div className="flex items-center justify-center gap-10 ">
            <button className="cursor-pointer border-none outline-none text-primary-200 hidden lg:inline-block">
              <PlayBackIcon className="w-5" />
            </button>
            {isFetchingTrack ? (
              <span className="text-gray-400 w-10 h-10 flex justify-center items-center">
                <ButtonLoaderIcon />
              </span>
            ) : (
              <button
                onClick={togglePlay}
                className="border-none outline-none w-10 h-10 min-w-[40px] cursor-pointer rounded-full flex items-center justify-center bg-blue-500 text-white transitio duration-100 md:w-12 md:h-12 md:min-w-[48px] hover:bg-blue-600"
              >
                {isPlaying ? (
                  <PauseIcon className="w-4 lg:w-5" />
                ) : (
                  <PlayIcon className="w-4 lg:w-5" />
                )}
              </button>
            )}

            <button className="cursor-pointer border-none outline-none text-primary-200 hidden lg:inline-block">
              <PlayNextIcon className="w-5" />
            </button>
          </div>
        </>
      )}
      {/* <div className="flex items-center justify-center gap-3 w-full">
        <span className="text-primary-500 font-medium text-sm">
          {Math.floor(currentTime / 60)}:
          {String(Math.floor(currentTime % 60)).padStart(2, "0")}
        </span>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="slider appearance-none w-full flex-1 h-2 bg-gray-300 rounded-full outline-none"
        />

        <span className="text-primary-500 font-medium text-sm">
          {Math.floor(duration / 60)}:
          {String(Math.floor(duration % 60)).padStart(2, "0")}
        </span>
      </div> */}
    </div>
  );
};

export default AudioPlayer;
