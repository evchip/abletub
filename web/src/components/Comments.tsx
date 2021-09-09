import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
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

interface CommentsProps {
  postId: number;
  newComment: any;
}

export const Comments: React.FC<CommentsProps> = ({ postId, newComment }) => {
  const [variables, setVariables] = useState({
    postId,
    limit: 50,
    cursor: null as null | string,
  });

  const [{ data, error, fetching }] = useCommentsQuery({
    variables,
  });

  if ((!fetching && !data) || (!fetching && !data!.comments.comments[0])) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Text color="white">
          there are no comments yet. why don't u start us off?
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
          <Flex justifyContent="flex-end">
            <Menu>
              <MenuButton
                fontSize={{ base: "12px", md: "14px", lg: "16px" }}
                as={Button}
                rightIcon={<ChevronDownIcon />}
                px={4}
                py={2}
                color="black"
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: "gray.400" }}
                _expanded={{ bg: "blue.400" }}
                _focus={{ boxShadow: "outline" }}
              >
                sort by
              </MenuButton>
              <MenuList bgColor="black">
                <MenuItem
                  onClick={() => {
                    setVariables({
                      postId,
                      limit: variables.limit,
                      cursor: "DESC",
                    });
                  }}
                  _hover={{ bg: "gray.400" }}
                >
                  new
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setVariables({
                      postId,
                      limit: variables.limit,
                      cursor: "ASC",
                    });
                  }}
                  _hover={{ bg: "gray.400" }}
                >
                  old
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <VStack align="center" flexWrap="wrap" width="100%" my={10}>
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
