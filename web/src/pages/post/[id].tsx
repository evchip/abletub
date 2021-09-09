import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Comments } from "components/Comments";
import CreateComment from "components/CreateComment";
import S3Image from "components/Image";
import { withUrqlClient } from "next-urql";
import React, { useEffect, useState } from "react";
import { EditDeletePostBtns } from "../../components/EditDeletePostBtns";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostfromUrl";
import { format } from "timeago.js";
import { UpvoteSection } from "components/UpvoteSection";

const Post = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();
  const [newComment, setNewComment] = useState({});

  const getNewComment = async (postId: number, values: { text: string }) => {
    const now = new Date();
    setNewComment({
      text: values.text,
      creator: { username: "you" },
      createdAt: now,
      i: 0,
    });
  };

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
    <Layout>
      <Flex
        p={5}
        mt="0"
        shadow="md"
        borderWidth="1px"
        width="100%"
        flexDirection="row"
        justifyContent="space-between"
        bgColor="blackAlpha.400"
        borderBottomRadius="30px"
        borderColor="pink.200"
        borderTop="none"
      >
        <Box width="70%">
          <Heading mb={4} color="white">
            {data.post.title}
          </Heading>
          <Box ml="5px">
            <Heading mb={4} size="md" color="white">
              {data.post.creator.username}
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
            <Flex align="left" width="80%">
              <Text color="white" fontSize="md" mr={2}>
                {data.post.text}
              </Text>
            </Flex>
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="end"
              width="100%"
              mt={2}
            >
              <EditDeletePostBtns
                id={data.post.id}
                creatorId={data.post.creator.id}
              />
              <Text color="white" fontSize="md" mr={2}>
                published {format(data.post.createdAt)}
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box display="flex" direction="row" >
        <UpvoteSection post={data.post} />
          {data.post.imageFileName !== null ? (
            <S3Image post={data.post} />
          ) : null}
        </Box>
      </Flex>
      <CreateComment postId={data.post.id} getNewComment={getNewComment} />
      <Comments postId={data.post.id} newComment={newComment} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
