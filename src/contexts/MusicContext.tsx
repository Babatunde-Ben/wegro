import React, {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";
interface ITrack {
  trackTitle: string;
  artist: string;
  imageURL: string;
  previewURL: string;
}
interface IMusicContext {
  recommendedTracks: ITrack[];
  trendingTracks: ITrack[];
  setRecommendedTracks: Dispatch<SetStateAction<ITrack[]>>;
  setTrendingTracks: Dispatch<SetStateAction<ITrack[]>>;
}

export const MusicContext = createContext<IMusicContext>({
  recommendedTracks: [],
  trendingTracks: [],
  setRecommendedTracks: () => {},
  setTrendingTracks: () => {},
});

export const MusicContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [recommendedTracks, setRecommendedTracks] = useState<ITrack[]>([]);
  const [trendingTracks, setTrendingTracks] = useState<ITrack[]>([]);
  return (
    <MusicContext.Provider
      value={{
        recommendedTracks,
        trendingTracks,
        setRecommendedTracks,
        setTrendingTracks,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContext;
