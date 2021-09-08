import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import AudioFooter from "components/AudioFooter";
import S3Image from "components/Image";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { EditDeletePostBtns } from "../components/EditDeletePostBtns";
import { Layout } from "../components/Layout";
import { UpvoteSection } from "../components/UpvoteSection";
import { usePostsQuery, useSetAudioFileMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import axios from "axios";
import WaveForm from "components/WaveForm";
import PlayPauseAudio from 'components/PlayPauseAudio'

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });
  const [, setAudioLink] = useSetAudioFileMutation();

  if (!fetching && !data) {
    return (
      <div>
        <div>no more posts to show... or something went wrong</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  const setAudio = async (audioFileName: string) => {
    console.log(audioFileName, typeof audioFileName);
    const result = await setAudioLink({ audioFileName });
    console.log(result);
  };

  return (
    <Layout>
      {!data && fetching ? (
        <div>Loading...</div>
      ) : (
        <VStack align="center" flexWrap="wrap" width="100%">
          {data!.posts.posts.map((p, i) =>
            !p ? null : (
              <Box
                style={{ margin: "10px 20px" }}
                key={p.id}
                p={5}
                display="flex"
                flexDirection="row"
                shadow="md"
                borderColor="black"
                borderWidth="1px"
                bgColor="darksalmon"
                borderRadius="40"
                width="100%"
              >
                <Flex align="center" justifyContent="space-between" mt="5">
                  <UpvoteSection post={p} />
                  <Flex direction="column">
                    <Heading
                      fontSize="3xl"
                      onClick={() => setAudio(p.audioFileName)}
                    >
                      {p.title}
                    </Heading>
                    <Text fontSize="xl">{p.creator.username}</Text>
                  </Flex>
                  {p.audioFileName ? (
                    null
                    /*{<WaveForm audioURL={p.audioFileName} />}*/
                  ) : null}
                  <PlayPauseAudio audioURL={p.audioFileName}/>
                  {/* <Text flex={1} mt={4}>
                    {p.textSnippet}
                  </Text> */}
                </Flex>
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <S3Image post={p} />
                    </Link>
                  </NextLink>
                </Box>
              </Box>
            )
          )}
        </VStack>
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
      {/* <AudioFooter /> */}
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
