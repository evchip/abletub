declare module "next-apollo";

interface Window {
  webkitAudioContext: typeof AudioContext;
}

interface Track {
  title: string;
  artist: string;
  streamUrl: string;
  trackId: number;
  isPlaying: boolean;
}

type ContextType = {
  track: Track;
  setTrack: (track: Track) => void;
};
