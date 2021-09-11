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

interface PostProps {
  assignPostPlaying(
    audioURL: string,
    artist: string,
    title: string,
    playPause: boolean,
    trackId: number
  ): void;
  playingTrackId: number;
}

const Post = ({ assignPostPlaying, playingTrackId }: PostProps) => {
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
    <Layout variant={"small"}>
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
          <Box display="flex" direction="row" justifyContent="space-between">
            <Box width="70%">
              <Heading mb={4} color="white">
                {data.post.title}
              </Heading>
              <Box ml="2px">
                <Heading mb={4} size="md" color="white">
                  {data.post.creator.username}
                </Heading>
              </Box>
              <Flex
                justifyContent="space-between"
                mt="3"
                ml="2px"
                width="100%"
                direction="column"
                height="60%"
              >
                <Flex align="left" width="100%">
                  <Text color="white" fontSize="md" mr={2}>
                    {data.post.text}
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box display="flex" direction="row" alignItems="center">
              {data.post.imageFileName !== null ? (
                <S3Image
                  post={data.post}
                  assignPostPlaying={assignPostPlaying}
                  playingTrackId={playingTrackId}
                />
              ) : null}
            </Box>
          </Box>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="end"
            width="100%"
            mt={2}
          >
            <UpvoteSection post={data.post} variant="30px" fontVariant="20px"/>
            <Flex alignItems="center">
            <EditDeletePostBtns
              id={data.post.id}
              creatorId={data.post.creator.id}
            />
            <Text color="white" fontSize="md" mr={2}>
              published {format(data.post.createdAt)}
            </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <CreateComment postId={data.post.id} getNewComment={getNewComment} />
      <Comments postId={data.post.id} newComment={newComment} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
