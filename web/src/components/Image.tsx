import { Box, Image } from '@chakra-ui/react';
import { _Post } from 'generated/graphql';
import React from 'react'
import { useGetPostFromUrl } from 'utils/useGetPostfromUrl';

function S3Image(post) {

      if (!post) {
        
        return (
            <Box>?</Box>
        );
      }
    return (
        <Box display="flex" justifyContent="flex-end">
            {post.post.imageFileName !== null ? (
              <Image 
                boxSize="250px"
                borderRadius="2rem"
                objectFit="cover"
                src={post.post.imageFileName} />
            ) : null}
        </Box>
    )
}

export default S3Image
