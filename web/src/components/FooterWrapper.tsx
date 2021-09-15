import React, { ReactElement, useContext } from "react";
import { TrackContext } from "utils/trackContext";
import AudioFooter from "./AudioFooter";

interface Props {}

function FooterWrapper({}: Props): ReactElement {
  const { track } = useContext(TrackContext);

  return (
    <>
      {track ? (
        <AudioFooter
          streamUrl={track!.streamUrl}
          title={track.title}
          artist={track.artist}
          isPlaying={track.isPlaying}
          trackId={track.trackId}
        />
      ) : null}
    </>
  );
}

export default FooterWrapper;
