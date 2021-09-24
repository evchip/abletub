import React, { useEffect, useState, useContext } from "react";
// import ReactHowler from "react-howler";
import { Box, IconButton } from "@chakra-ui/react";
import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa";
import {
  PostSnippetFragment,
} from "generated/graphql";
import TrackContext from "utils/trackContext";

interface PlayPauseButtonProps {
  post: PostSnippetFragment;
}

function PlayPauseAudioFC({ post }: PlayPauseButtonProps) {
  const [playPause, setPlayPause] = useState(false);
  const { track, setTrack } = useContext(TrackContext) as ContextType;
  
  useEffect(() => {
    if (track && track.trackId === post.id) {
      setPlayPause(track.isPlaying)
    } else {
      setPlayPause(false)
    }
  }, [track])

  const songInfo = {
    title: post.title,
    artist: post.creator.username,
    streamUrl: post.audioFileName,
    trackId: post.id,
    isPlaying: false,
  };

  async function handlePlay() {
    songInfo.isPlaying = true;
    setTrack(songInfo);
    setPlayPause(true);
  }

  async function handlePause() {
    songInfo.isPlaying = false;
    setTrack(songInfo);
    setPlayPause(false);
  }

  return (
    <Box>
      {playPause ? (
        <IconButton
          borderRadius="15px"
          as={FaRegPauseCircle}
          mb={4}
          aria-label="FaRegPauseCircle"
          ml="auto"
          onClick={handlePause}
          variant="ghost"
          size="lg"
          className="play-pause-icon"
        />
      ) : (
        <IconButton
          borderRadius="15px"
          as={FaRegPlayCircle}
          mb={4}
          aria-label="FaRegPlayCircle"
          ml="auto"
          onClick={handlePlay}
          variant="ghost"
          size="lg"
          className="play-pause-icon"
        />
      )}
    </Box>
  );
}

export default PlayPauseAudioFC;
