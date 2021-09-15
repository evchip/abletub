import {createContext} from 'react'

// type track = { title: string, artist: string, audioURL: string, trackId: number }
const songInfo = {
    title: "",
    artist: "",
    streamUrl: "",
    trackId: "",
    isPlaying: false,
  };

export const TrackContext = createContext(songInfo);