import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { format } from "timeago.js";
import React, { ReactElement } from "react";
import { User } from "generated/graphql";

interface Props {
  i: number;
  text: string;
  creator: {
    __typename?: "User" | undefined;
  } & Pick<User, "id" | "username">;
  createdAt: string;
}

function Comment({ i, text, creator, createdAt }: Props): ReactElement {
  return (
    <Box
      key={i}
      p={5}
      display="flex"
      flexDirection="column"
      shadow="md"
      borderWidth="1px"
      direction="column"
      bgColor="gray.400"
      borderRadius="5"
      width="100%"
    >
      <Flex
        justifyContent="space-between"
        mt="1"
        width="100%"
        direction="column"
      >
        <Flex align="left" width="80%" m="auto">
          <Heading fontSize="md">{text}</Heading>
        </Flex>
        <Flex direction="row" justifyContent="flex-end" width="100%" mt={2}>
          <Text fontSize="md" mr={2}>
            {creator.username}
          </Text>
          <Text fontSize="md" mr={2}>
            {format(createdAt)}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Comment;
