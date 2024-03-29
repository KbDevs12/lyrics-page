"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface LyricsContextType {
  lyrics: string;
  setLyrics: (lyrics: string) => void;
}

const LyricsContext = createContext<LyricsContextType | undefined>(undefined);

export const useLyricsContext = () => {
  const context = useContext(LyricsContext);
  if (!context) {
    throw new Error("useLyricsContext must be used within a LyricsProvider");
  }
  return context;
};

interface LyricsProviderProps {
  children: ReactNode;
}

export const LyricsProvider: React.FC<LyricsProviderProps> = ({ children }) => {
  const [lyrics, setLyrics] = useState<string>("");

  return (
    <LyricsContext.Provider value={{ lyrics, setLyrics }}>
      {children}
    </LyricsContext.Provider>
  );
};
