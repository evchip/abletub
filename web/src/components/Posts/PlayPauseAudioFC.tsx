import React, { useEffect, useState, useContext } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa";
import { Maybe, User, Post } from "generated/graphql";
import TrackContext from "utils/trackContext";

interface PlayPauseButtonProps {
  post:
    | Maybe<
        { __typename?: "Post" } & Pick<
          Post,
          | "id"
          | "createdAt"
          | "updatedAt"
          | "title"
          | "points"
          | "audioFileName"
          | "imageFileName"
          | "voteStatus"
        > & { creator: { __typename?: "User" } & Pick<User, "id" | "username"> }
      >
    | undefined;
}

function PlayPauseAudioFC({ post }: PlayPauseButtonProps) {
  const [playPause, setPlayPause] = useState(false);
  const { track, setTrack } = useContext(TrackContext) as ContextType;

  useEffect(() => {
    if (post && track && track.trackId === post.id) {
      setPlayPause(track.isPlaying);
    } else {
      setPlayPause(false);
    }
  }, [track]);

  const songInfo = {
    title: post!.title,
    artist: post!.creator!.username,
    streamUrl: post!.audioFileName,
    trackId: post!.id,
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
    <>
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
    </>
  );
}

export default PlayPauseAudioFC;
