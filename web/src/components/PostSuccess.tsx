import React from 'react';
import { Flex, Text, Heading } from "@chakra-ui/react"

function PostSuccess() {
  return (
    <Flex justifyContent="center">
      <Heading >
        upload successful
      </Heading>
      <Text >
        your post may take a few minutes to show up. 
      </Text>
    </Flex>
  );
}

export default PostSuccess;
