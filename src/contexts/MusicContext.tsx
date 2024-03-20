import React, { useState, createContext } from "react";
interface IMusicContext {
  message: string;
}

export const MusicContext = createContext<IMusicContext | null>(null);

export const MusicContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message] = useState("Thank you");
  return (
    <MusicContext.Provider value={{ message }}>
      {children}
    </MusicContext.Provider>
  );
};

export default MusicContext;
