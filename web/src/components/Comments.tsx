import { Box, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { useCommentsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

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
  console.log("comments data", data, "postId", postId)
  if (!fetching && !data || !fetching && !data!.comments.comments[0]) {
    return (
      <div>
        <div>no comments to show... or something went wrong</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Box>
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <HStack align="center" flexWrap="wrap" width="100%">
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
                bgColor="blue.50"
                borderRadius="40"
              >
                <Flex align="center" justifyContent="space-between" mt="5">
                  <Flex direction="column">
                    <Heading fontSize="3xl">{c.text}</Heading>
                    <Text fontSize="xl">{c.createdAt}</Text>
                  </Flex>
                </Flex>
              </Box>
            )
          )}
        </HStack>
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

