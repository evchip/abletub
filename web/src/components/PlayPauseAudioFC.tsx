import React, { useEffect, useState } from "react";
// import ReactHowler from "react-howler";
import { Button, Box, IconButton, Icon } from "@chakra-ui/react";
import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa";
import {
    PostSnippetFragment,
} from "generated/graphql";

interface PlayPauseButtonProps {
  post: PostSnippetFragment
  assignPostPlaying(audioURL: string, artist: string, title: string, playPause: boolean, trackId: number): any;
  playingTrackId: number
}

function PlayPauseAudioFC({post, assignPostPlaying, playingTrackId}: PlayPauseButtonProps) {
  const [playPause, setPlayPause] = useState(false);

  function handlePlay() {
    assignPostPlaying(post.audioFileName, post.creator.username, post.title, true, post.id);
    setPlayPause(true);
  }

  function handlePause() {
    assignPostPlaying(post.audioFileName, post.creator.username, post.title, false, post.id);
    setPlayPause(false);
  }

  useEffect(() => {
      console.log("playPause", playPause, playingTrackId)
    if (playingTrackId === post.id) {
        setPlayPause(!playPause)
    }
  })

  return (
    <Box>
      {playPause === true ? (
        <IconButton
          borderRadius="15px"
          as={FaRegPauseCircle}
          mb={4}
          aria-label="FaRegPauseCircle"
          ml="auto"
          onClick={handlePause}
          variant="ghost"
          size="lg"
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
        />
      )}
    </Box>
  );
}

export default PlayPauseAudioFC;
