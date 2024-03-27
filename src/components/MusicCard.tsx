import { useContext } from "react";
import MusicContext from "../contexts/MusicContext";
type MusicCardProps = {
  id?: string;
  previewURL?: string;
  imageURL?: string;
  trackTitle?: string;
  artist?: string;
};

export const EmptyMusicCard = () => {
  return (
    <div>
      <div className="rounded-xl  w-full h-28 bg-white mb-3 animate-pulse"></div>
      <div className="rounded-xl bg-white animate-pulse mb-2 h-4 w-3/4"></div>
      <div className="rounded-xl bg-white animate-pulse h-4 w-1/2"></div>
    </div>
  );
};

const MusicCard = ({
  id,
  previewURL,
  imageURL,
  trackTitle,
  artist,
}: MusicCardProps) => {
  const { selectedTrack, setSelectedTrack } = useContext(MusicContext);

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
      className={` ${
        id === selectedTrack?.id ? "bg-white shadow-sm" : "hover:bg-white/30"
      } p-2 cursor-pointer rounded-xl`}
    >
      <div className="overflow-hidden rounded-xl mb-3 shadow-md bg-slate-200 ">
        <img src={imageURL} alt="" className="object-cover w-full h-28" />
      </div>
      <p className="text-primary-500 font-semibold text-sm sm:text-base ">
        {trackTitle}
      </p>
      <p className="text-primary-400 text-xs sm:text-sm">{artist}</p>
    </div>
  );
};

export default MusicCard;
