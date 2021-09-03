import { Box, Flex, Heading } from "@chakra-ui/react";
import { Comments } from "components/Comments";
import CreateComment from "components/CreateComment";
import S3Image from "components/Image";
import WaveForm from "components/WaveForm";
import { withUrqlClient } from "next-urql";
import React from "react";
import { EditDeletePostBtns } from "../../components/EditDeletePostBtns";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostfromUrl";

const Post = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();
  console.log("data in post query", data);
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
          bgColor="twitter.50"
        >
          <Box width="70%">
            <Heading mb={4}>{data.post.title}</Heading>
              <Box ml="5px">{data.post.creator.username}</Box>
              <WaveForm audioURL={data.post.audioFileName} />
              <Box ml="5px">{data.post.text}</Box>
            </Box>
            <Box ml={5}>
          <EditDeletePostBtns
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        </Box>
            <Box>
              {data.post.imageFileName !== null ? (
                <S3Image post={data.post} />
              ) : null}
            </Box>
        </Flex>
        <CreateComment postId={data.post.id}/>
        <Comments postId={data.post.id} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
