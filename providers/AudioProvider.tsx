"use client";

import { AudioContextType, AudioProps } from "@/types";
import { usePathname } from "next/navigation";
import { createContext, use, useEffect, useState } from "react";





const AudioContext = createContext<AudioContextType | undefined>(undefined);
const AudioProvider = ({children}:{children:React.ReactNode}) => {
    const [audio, setAudio] = useState<AudioProps | undefined>();
    const pathname= usePathname();

    useEffect(() => {
        if(pathname === "/create-audio")
            setAudio(undefined)
    },[pathname])        
    return (
    <AudioContext.Provider value={{audio ,setAudio}}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
    const context = use(AudioContext);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
}
export default AudioProvider;