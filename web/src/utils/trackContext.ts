import { createContext, useContext, useState } from "react";

  export const defaultTrack = {
    track: {
      title: "",
      artist: "",
      streamUrl: "",
      trackId: 0,
      isPlaying: false,
    },
    setTrack: () => {}
}

const TrackContext = createContext<ContextType>(defaultTrack)

export default TrackContext