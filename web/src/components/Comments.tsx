import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { useCommentsQuery } from "../generated/graphql";
import Comment from "./Comment";
import SortMenu from "./SortMenu"

interface CommentsProps {
  postId: number;
  newComment: any;
}

export const Comments: React.FC<CommentsProps> = ({ postId, newComment }) => {
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
      <Box display="flex" justifyContent="center" mt={10}>
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
        <div>loading...</div>
      ) : (
        <>
        <SortMenu handleSort={handleSort}/>
          <VStack align="center" flexWrap="wrap" width="100%" my={5}>
            {newComment.text ? (
              <Comment
                i={newComment.i}
                text={newComment.text}
                creator={newComment.creator}
                createdAt={newComment.createdAt}
              />
            ) : null}
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
            colorScheme="teal"
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
