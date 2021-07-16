import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import React from "react";
import { Layout } from "../components/Layout";
import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from 'next/link';

const Index = () => { 
  const [{data, fetching}] = usePostsQuery({
    variables: {
      limit: 10,
    }
  });
  console.log(data);

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
        {data.posts.map((p) => 
          (
          <Box key={p.id} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{p.title}</Heading>
            <Text mt={4}>{p.textSnippet}</Text>
          </Box>
            )
        )}
        </Stack>
      )}
      { data ? <Flex>
        <Button isLoading={fetching} colorScheme="teal " variant="solid" m="auto" my={8}>Load More</Button>
      </Flex> : null }
    </Layout>
  )
}
export default withUrqlClient(createUrqlClient, {ssr: true})(Index)
