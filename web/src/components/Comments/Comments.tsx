import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  Heading
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useCommentsQuery } from "../../generated/graphql";
import Comment from "./Comment";
import SortMenu from "../SortMenu";

interface CommentsProps {
  postId: number;
}

export const Comments: React.FC<CommentsProps> = ({ postId}) => {
  const [variables, setVariables] = useState({
    postId,
    limit: 50,
    cursor: 'DESC',
  });

  const handleSort = (cursorProp: string):void => {
    setVariables({postId: variables.postId, limit: variables.limit, cursor: cursorProp})
  }

  const [{ data, error, fetching }] = useCommentsQuery({
    variables,
  });

  if ((!fetching && !data) || (!fetching && !data!.comments.comments[0])) {
    return (
      <Box display="flex" justifyContent="center" mt={10} minHeight="20">
        <Text color="white">
          there are no comments yet. why don't you start us off?
        </Text>
        <div>{error?.message}</div>
      </Box>
    );
  }

  return (
    <Box>
      {!data && fetching ? (
        <Flex width="100%" m="auto" mt={10} justifyContent="center">
          <Heading>loading...........</Heading>
        </Flex>
      ) : (
        <>
        <SortMenu handleSort={handleSort}/>
          <VStack align="center" flexWrap="wrap" width="100%" my={5}>
            {data!.comments.comments.map((c, i) =>
              !c ? null : (
                <Comment
                  i={i}
                  text={c.text}
                  creator={c.creator}
                  createdAt={c.createdAt}
                />
              )
            )}
          </VStack>
        </>
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
            colorScheme="pink"
            variant="solid"
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Box>
  );
};
