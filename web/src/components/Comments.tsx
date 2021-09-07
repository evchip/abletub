import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { format } from "timeago.js";
import { useCommentsQuery } from "../generated/graphql";

interface CommentsProps {
  postId: number;
}

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [variables, setVariables] = useState({
    postId,
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, error, fetching }] = useCommentsQuery({
    variables,
  });
  console.log("comments data", data, "postId", postId);
  if ((!fetching && !data) || (!fetching && !data!.comments.comments[0])) {
    return (
      <div>
        <Text>There are no comments yet. Would you do the honors?</Text>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Box>
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <VStack align="center" flexWrap="wrap" width="100%" my={10}>
          {data!.comments.comments.map((c, i) =>
            !c ? null : (
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
                    <Heading fontSize="md">{c.text}</Heading>
                  </Flex>
                  <Flex
                    direction="row"
                    justifyContent="flex-end"
                    width="100%"
                    mt={2}
                  >
                    <Text fontSize="md" mr={2}>
                      {c.creator.username}
                    </Text>
                    <Text fontSize="md" mr={2}>
                      {format(c.createdAt)}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            )
          )}
        </VStack>
      )}
      {data && data.comments.hasMore ? (
        <Flex>
          <Button
            isLoading={fetching}
            onClick={() => {
              setVariables({
                postId,
                limit: variables.limit,
                cursor:
                  data.comments.comments[data.comments.comments.length - 1]
                    .createdAt,
              });
            }}
            colorScheme="teal"
            variant="solid"
            m="auto"
            my={8}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Box>
  );
};
