import { Box, Image } from "@chakra-ui/react";
import { _Post, PostSnippetFragment } from "generated/graphql";
import React from "react";
import PlayPauseAudioFC from "./PlayPauseAudioFC";

interface S3ImageProps {
  post: Pick<_Post, "id" | "createdAt" | "updatedAt" | "title" | "points" | "audioFileName" | "imageFileName" | "text" | "voteStatus"> | undefined;
}

function S3Image({post}: S3ImageProps) {

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
          { post.audioFileName ? ( 
          <PlayPauseAudioFC
            post={post}
          />) : (null)}
         
        </div>
      </Box>
    </div>
  );
}

export default S3Image;
