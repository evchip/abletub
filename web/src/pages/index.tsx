import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import S3Image from "components/Image";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { useGetPostFromUrl } from "utils/useGetPostfromUrl";
import { EditDeletePostBtns } from "../components/EditDeletePostBtns";
import { Layout } from "../components/Layout";
import { UpvoteSection } from "../components/UpvoteSection";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return (
      <div>
        <div>no more posts to show... or something went wrong</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <HStack spacing="10" flexWrap="wrap" width="100%">
          {data!.posts.posts.map((p, i) =>
            !p ? null : (
              <Flex key={p.id} mx={5} shadow="md" borderWidth="1px" direction="column" bgColor="blue.50" borderRadius="40">
                <Box flex={1} >
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <S3Image post={p} />
                    </Link>
                  </NextLink>
                </Box>
                <Flex align="center" mt="5">
                  <UpvoteSection post={p} />
                  <Flex direction="column">
                    <Heading fontSize="3xl">{p.title}</Heading>
                    <Text fontSize="xl">{p.creator.username}</Text>
                  </Flex>
                  {/* <Text flex={1} mt={4}>
                    {p.textSnippet}
                  </Text> */}
                  <Box ml="auto">
                    <EditDeletePostBtns id={p.id} creatorId={p.creator.id} />
                  </Box>
                </Flex>
              </Flex>
            )
          )}
        </HStack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            isLoading={fetching}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
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
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
