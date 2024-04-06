import React, {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";
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
});

export const MusicContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedTrack, setSelectedTrack] = useState<ITrack>({
    id: "",
    artist: "",
    imageURL: "",
    previewURL: "",
    trackTitle: "",
  });

  return (
    <MusicContext.Provider
      value={{
        selectedTrack,
        setSelectedTrack,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContext;
