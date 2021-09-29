import React, { ReactElement, useContext, useEffect, useState } from "react";
import { IPFSRequestHandler } from "utils/IPFSUploads/fetchIPFSData";
import TrackContext from "utils/trackContext";
import AudioFooter from "./AudioFooter";

interface Props {}

function FooterWrapper({}: Props): ReactElement {
  const { track } = useContext(TrackContext);

  const [audioCID, setAudioCID] = useState("");
  const [activeTrack, setActiveTrack] = useState("")

  useEffect(() => {
    if (activeTrack !== track.streamUrl) {
      
      (async () => {
        const defaultAudioURL = "https://bafybeigxnmal2kcq5taotnkjxdegx7gshdikgqivrbplldm3pru4eywmka.ipfs.dweb.link/Sparkling%20Water.mp3";
        let audioURL = defaultAudioURL;
  
        if (track && track.streamUrl) {        
          audioURL = track.streamUrl;
        }
        const CID = await (IPFSRequestHandler(defaultAudioURL, audioURL)) as string;
        setActiveTrack(track.streamUrl)
        setAudioCID(CID);
      })();
    }
    
  }, [track.streamUrl]);

  return (
    <>
      {audioCID !== "" ? (
        <AudioFooter
          streamUrl={audioCID}
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
