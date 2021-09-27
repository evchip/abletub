import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { UpvoteSection } from "../components/Posts/UpvoteSection";
import { PostsQuery, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { format } from "timeago.js";
import IPFSImage from "components/Posts/IPFSImage";
import { withApollo } from "utils/withApollo";

const Index = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 3,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true
  });

  if (!loading && !data) {
    return (
      <div>
        <div>no more posts to show... or something went wrong</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <>
      <Layout>
        {!data && loading ? (
          <Flex width="100%" m="auto" mt={10} justifyContent="center">
            <Heading>loading...</Heading>
          </Flex>
        ) : (
          <HStack align="center" justify="center" flexWrap="wrap" width="100%">
            {data!.posts.posts.map((p, i) =>
              !p ? null : (
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  width="360px"
                  key={i}
                  style={{ margin: "0px" }}
                >
                  <Flex
                    style={{ margin: "20px 0px" }}
                    key={p.id}
                    p={5}
                    display="flex"
                    flexDirection="column"
                    borderWidth="1px"
                    width="80%"
                    justifyContent="space-between"
                    bgColor="blackAlpha.800"
                    borderBottomRadius="30px"
                    borderColor="pink.200"
                    className="post-card"
                  >
                    <Box display="flex" justifyContent="center">
                      {p.imageFileName !== null ? <IPFSImage post={p} /> : null}
                    </Box>
                    <Box width="100%" mt={5}>
                      <Box ml="2px">
                        <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                          <Link>
                            <Heading
                              fontSize="lg"
                              overflow="hidden"
                              whiteSpace="nowrap"
                              textOverflow="ellipsis"
                              color="pink.200"
                            >
                              {p.title || "untitled"}
                            </Heading>
                          </Link>
                        </NextLink>
                      </Box>
                      <Box ml="2px" mt={2}>
                        <Heading
                          mb={4}
                          fontSize="md"
                          color="white"
                          overflow="hidden"
                          whiteSpace="nowrap"
                          textOverflow="ellipsis"
                        >
                          {p.creator.username}
                        </Heading>
                      </Box>
                      <Flex
                        justifyContent="space-between"
                        mt="3"
                        ml="1"
                        width="100%"
                        direction="column"
                        height="60%"
                      >
                        <Flex
                          direction="row"
                          justifyContent="space-between"
                          alignItems="end"
                          width="100%"
                          mt={2}
                        >
                          <Text color="white" fontSize="sm" mr={2}>
                            {format(p.createdAt)}
                          </Text>
                          <UpvoteSection
                            post={p}
                            variant="24px"
                            fontVariant="16px"
                          />
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              )
            )}
          </HStack>
        )}
        {data && data.posts.hasMore ? (
          <Flex>
            <Button
              isLoading={loading}
              onClick={() => {
                fetchMore({
                  variables: {
                    limit: variables!.limit,
                    cursor:
                      data.posts.posts[data.posts.posts.length - 1].createdAt,
                  }
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
      </Layout>
    </>
  );
};
export default withApollo({ssr: true})(Index);
