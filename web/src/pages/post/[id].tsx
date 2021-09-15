import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Comments } from "components/Comments";
import CreateComment from "components/CreateComment";
import S3Image from "components/Image";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { EditDeletePostBtns } from "../../components/EditDeletePostBtns";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostfromUrl";
import { format } from "timeago.js";
import { UpvoteSection } from "components/UpvoteSection";


interface PostProps {

}

const Post = ({ }: PostProps) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();


  if (fetching) {
    return (
      <Layout>
        <div>loading....</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>We couldn't find that post...</Box>
      </Layout>
    );
  }
  return (
    <Layout variant={"regular"}>
      <Flex direction="column" width="92%" justifyContent="center" mx="auto">
      <Box display="flex" direction="row">
        <Flex
          p={5}
          mt="0"
          shadow="md"
          borderWidth="1px"
          width="100%"
          flexDirection="column"
          justifyContent="space-between"
          bgColor="blackAlpha.600"
          borderBottomRadius="30px"
          borderColor="pink.200"
          borderTop="none"
          minH="xs"
        >
          <Box display="flex" justifyContent="space-between">
            <Box >
              <Heading mb={4} color="white" fontSize={["medium", "large", "x-large"]}>
                {data.post.title}
              </Heading>
              <Box ml=".15rem">
                <Heading mb={4} color="white" fontSize={["small", "medium", "x-large"]}>
                  {data.post.creator.username}
                </Heading>
              </Box>
              <Flex
                justifyContent="space-between"
                mt="3"
                ml=".15rem"
                width="100%"
                direction="column"
                height="60%"
              >
                <Flex align="left" width="100%">
                  <Text color="white" mr={2} fontSize={["xs", "sm", "md"]}>
                    {data.post.text}
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box display="flex" direction="row" alignItems="center">
              {data.post.imageFileName !== null ? (
                <S3Image
                  post={data.post}
                />
              ) : null}
            </Box>
          </Box>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="end"
            width="100%"
            mt={4}
          >
            <UpvoteSection post={data.post} variant="30px" fontVariant="20px"/>
            <Flex alignItems="center">
            <EditDeletePostBtns
              id={data.post.id}
              creatorId={data.post.creator.id}
            />
            <Text color="white" fontSize={["xx-small", "xs", "sm"]} mr={2}>
              published {format(data.post.createdAt)}
            </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <CreateComment pageProps={data.post.id} postId={data.post.id} />
      <Comments postId={data.post.id} />
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
