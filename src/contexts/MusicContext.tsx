import { useQuery } from "@tanstack/react-query";
import React, {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
  useRef,
} from "react";
import { getTrack } from "../utils/backendRequest";
interface ITrack {
  id: string | undefined;
  trackTitle: string | undefined;
  artist: string | undefined;
  imageURL: string | undefined;
  previewURL?: string | undefined;
}
interface IMusicContext {
  selectedTrack: ITrack;
  setSelectedTrack: Dispatch<SetStateAction<ITrack>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
  currentTime: number;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  isFetchingTrack: boolean;
  togglePlay: () => void;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MusicContext = createContext<IMusicContext>({
  selectedTrack: {
    id: "",
    artist: "",
    imageURL: "",
    previewURL: "",
    trackTitle: "",
  },
  setSelectedTrack: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  duration: 0,
  setDuration: () => {},
  currentTime: 0,
  setCurrentTime: () => {},
  isFetchingTrack: false,
  togglePlay: () => {},
  handleSeek: () => {},
});

export const MusicContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [selectedTrack, setSelectedTrack] = useState<ITrack>({
    id: "",
    artist: "",
    imageURL: "",
    previewURL: "",
    trackTitle: "",
  });

  const {
    data: track,
    isLoading: isFetchingTrack,
    refetch: fetchTrack,
  } = useQuery({
    queryKey: ["get-track", selectedTrack?.id],
    queryFn: () => getTrack(selectedTrack?.id),
    enabled: false,
    retry: false,
  });

  const togglePlay = () => {
    if (selectedTrack?.previewURL || track?.data?.tracks[0]?.preview_url) {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    } else if (selectedTrack?.id) {
      fetchTrack();
    } else return;
  };
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  return (
    <MusicContext.Provider
      value={{
        selectedTrack,
        setSelectedTrack,
        isPlaying,
        setIsPlaying,
        duration,
        setDuration,
        currentTime,
        setCurrentTime,
        isFetchingTrack,
        togglePlay,
        handleSeek,
      }}
    >
      {!!selectedTrack?.previewURL && (
        <audio
          ref={audioRef}
          src={selectedTrack?.previewURL}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
      )}
      {!selectedTrack?.previewURL && !!track?.data?.tracks[0]?.preview_url && (
        <audio
          ref={audioRef}
          src={track?.data?.tracks[0]?.preview_url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
      )}
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContext;
