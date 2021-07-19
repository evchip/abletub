import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { Box, Button, Flex, Heading, Icon, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from 'next/link';

const Index = () => { 
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string});
  const [{data, fetching}] = usePostsQuery({
    variables
  });

  if (!fetching && !data) {
    return <div>no more posts to show... or something went wrong</div>
  }
  return (
    <Layout>
      <Flex align="center">
        <Heading>Boiler</Heading>
        <NextLink href='/create-post'>
          <Link ml="auto">create post</Link>
        </NextLink>
      </Flex>
      <br/>
      
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing="8px"> 
        {data!.posts.posts.map((p) => 
          (
          <Box key={p.id} p={5} shadow="md" borderWidth="1px">
            <Icon name="chevron-up" size="24px" />
            <Icon name="chevron-down" size="24px" />
            <Heading fontSize="xl">{p.title}</Heading>
            <Text>Posted by {p.creator.username}</Text>
            <Text mt={4}>{p.textSnippet}</Text>
          </Box>
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
      </Flex> : null }
    </Layout>
  )
}
export default withUrqlClient(createUrqlClient, {ssr: true})(Index)
