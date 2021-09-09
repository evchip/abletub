import { Box, Image } from '@chakra-ui/react';
import { _Post } from 'generated/graphql';
import React from 'react'
import { useGetPostFromUrl } from 'utils/useGetPostfromUrl';
import PlayPauseAudio from './PlayPauseAudio';

function S3Image(post, assignPostPlaying) {

      if (!post) {
        
        return (
            <Box>?</Box>
        );
      }
    return (
          <div className="port-cont-hov tile scale-anm">
        <Image
          boxSize="250px"
          borderRadius="2rem"
          className="portfolio-img"
          src={post.post.imageFileName}
          alt=""
          objectFit="cover"
        />
        <Box className="port-img-overlay" borderRadius="2rem">
          <div className="port-text">
            <PlayPauseAudio postId={post.postId} audioURL={post.post.audioFileName} assignPostPlaying={assignPostPlaying}/>
          </div>
        </Box>
      </div>
    )
}

export default S3Image
