import { Box, Heading, Flex } from "@chakra-ui/react";
import UploadFile from "components/UploadFileFC";
import { withUrqlClient } from "next-urql";
import React from "react";
import { EditDeletePostBtns } from "../../components/EditDeletePostBtns";
import { Layout } from "../../components/Layout";
import PlayPauseAudio from "../../components/PlayPauseAudio";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostfromUrl";
import axios from "axios";
import { useState } from "react";

const Post = ({}) => {
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
    <Layout>
      <Flex >
        <Flex p={5} shadow="md" borderWidth="1px" width="80%" flexDirection="column">
          <Heading mb={4}>{data.post.title}</Heading>
          <Box>{data.post.text}</Box>
          <Box>
            {data.post.fileName !== null ? (
              <img src={data.post.fileName} />
            ) : null}
          </Box>
        </Flex>
        <Flex p={5} shadow="md" borderWidth="1px" ml={5}>
          <PlayPauseAudio audioURL={data.post.fileName} />
        </Flex>

        <Box ml={5}>
          <EditDeletePostBtns
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        </Box>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
