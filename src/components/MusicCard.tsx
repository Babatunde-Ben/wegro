import { useContext } from "react";
import MusicContext from "../contexts/MusicContext";
type MusicCardProps = {
  id?: string;
  previewURL?: string;
  imageURL?: string;
  trackTitle?: string;
  artist?: string;
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
      <div className="overflow-hidden rounded-xl mb-3 shadow-md">
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
