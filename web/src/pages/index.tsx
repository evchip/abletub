import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withApollo } from "../utils/withApollo";
import NextLink from 'next/link';
import React from "react";
import { EditDeletePostBtns } from '../components/EditDeletePostBtns';
import { Layout } from "../components/Layout";
import { UpvoteSection } from '../components/UpvoteSection';
import { usePostsQuery } from "../generated/graphql";

const Index = () => { 
  const {data, error, loading, fetchMore, variables} = usePostsQuery({
    variables: {
      limit: 10,
      cursor: null
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <div>
        <div>no more posts to show... or something went wrong</div>
        <div>{error?.message}</div>
      </div>
    )

  }
  return (
    <Layout>
      {!data && loading ? (
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
          <Button isLoading={loading} onClick={() => {
            fetchMore({
              variables: {
                limit: variables?.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              },
              // updateQuery: (previousValue, {fetchMoreResult}): PostsQuery => {
              //   if (!fetchMoreResult) {
              //       return previousValue as PostsQuery
              //   }
              //   return {
              //       __typename: 'Query',
              //       posts: {
              //         __typename: 'PaginatedPosts',
              //         hasMore: (fetchMoreResult as PostsQuery).posts.hasMore,
              //         posts: [
              //           ...(previousValue as PostsQuery).posts.posts,
              //           ...(fetchMoreResult as PostsQuery).posts.posts
              //         ]
              //       }
              //   }
              // }
            })
          }} colorScheme="teal" variant="solid" m="auto" my={8}>Load More</Button>
        </Flex> 
        : null }
    </Layout>
  );
};
export default withApollo({ ssr: true })(Index);
