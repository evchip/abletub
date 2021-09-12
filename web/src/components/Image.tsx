import { Box, Image } from "@chakra-ui/react";
import { _Post, PostSnippetFragment } from "generated/graphql";
import React from "react";
import PlayPauseAudioFC from "./PlayPauseAudioFC";

type assignPostPlayingType = (audioURL: string, artist: string, title: string, playPause: boolean, trackId: number ) => any;

interface S3ImageProps {
  assignPostPlaying: assignPostPlayingType;
  post: PostSnippetFragment;
  songInfo: {title: string, artist: string, audioURL: string, trackId: number}
}

function S3Image({post, assignPostPlaying, songInfo}: S3ImageProps) {
  if (!post) {
    return <Box>?</Box>;
  }
  return (
    <div className="port-cont-hov tile scale-anm">
      <Image
        boxSize={["40", "72"]}
        borderRadius="2rem"
        className="portfolio-img"
        src={post.imageFileName}
        alt=""
        objectFit="cover"
      />
      <Box className="port-img-overlay" borderRadius="2rem">
        <div className="port-text">
          <PlayPauseAudioFC
            post={post}
            assignPostPlaying={assignPostPlaying}
            songInfo={songInfo}
          />
        </div>
      </Box>
    </div>
  );
}

export default S3Image;
