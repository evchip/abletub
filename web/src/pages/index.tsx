import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import React, { useState } from "react";
import { EditDeletePostBtns } from '../components/EditDeletePostBtns';
import { Layout } from "../components/Layout";
import { UpvoteSection } from '../components/UpvoteSection';
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => { 
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string});
  const [{data, error, fetching}] = usePostsQuery({
    variables
  });

  if (!fetching && !data) {
    return (
      <div>
        <div>no more posts to show... or something went wrong</div>
        <div>{error?.message}</div>
      </div>
    )

  }
  return (
    <Layout>
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing="8px"> 
        {data!.posts.posts.map((p) => 
          !p ? null :
          (
          <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
            <UpvoteSection post={p} />
            <Box flex={1}>
              <NextLink href="/post/[id]" as={`/post/${p.id}`}>
              <Link>
               <Heading fontSize="xl">{p.title}</Heading>
              </Link>
              </NextLink>
              <Text>Posted by {p.creator.username}</Text>
              <Flex align="center">
                <Text flex={1} mt={4}>{p.textSnippet}</Text>  
                  <Box ml="auto">
                    <EditDeletePostBtns id={p.id} creatorId={p.creator.id} />
                  </Box>
            </Flex>
            </Box>
          </Flex>
            )
        )}
        </Stack>
      )}
      { data && data.posts.hasMore ? 
        <Flex>
          <Button isLoading={fetching} onClick={() => {
            console.log('data posts',data.posts.posts)
            setVariables({
            limit: variables.limit,
            cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
            })
          }} colorScheme="teal" variant="solid" m="auto" my={8}>Load More</Button>
        </Flex> 
        : null }
    </Layout>
  )
}
export default withUrqlClient(createUrqlClient, {ssr: true})(Index)
