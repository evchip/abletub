import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Post,
  useVoteMutation,
  User,
  PostSnippetFragmentDoc,
  VoteMutation,
  useMeQuery,
} from "../../generated/graphql";
import gql from "graphql-tag";
import { ApolloCache } from "@apollo/client";
import { useRouter } from "next/router";
import { isServer } from "utils/isServer";

interface UpvoteSectionProps {
  post: { __typename?: "Post" | undefined } & {
    __typename?: "Post" | undefined;
  } & Pick<
      Post,
      | "title"
      | "id"
      | "createdAt"
      | "updatedAt"
      | "points"
      | "audioFileName"
      | "imageFileName"
      | "voteStatus"
    > & { creator: { __typename?: "User" } & Pick<User, "id" | "username"> };
  variant: string;
  fontVariant: string;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment __ on Post {
        id
        points
        voteStatus
      }
    `,
  });
  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPointValue = (data.points as number) + value;
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: {
        id: postId,
        points: newPointValue,
        voteStatus: value,
      },
    });
  }
};

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({
  post,
  variant,
  fontVariant,
}) => {
  const [loadingState, setLoadingState] = useState<
    "upvote-loading" | "downvote-loading" | "not-loading"
  >("not-loading");
  const [vote] = useVoteMutation();
  const [voteStatus, setVoteStatus] = useState(post.voteStatus);
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  const router = useRouter();

  const handleVote = async () => {
    if (!data?.me) {
      router.push("/login")
      return
    }
    if (post.voteStatus !== voteStatus) {
      return;
    }
    if (post.voteStatus === 1) {
      setLoadingState("downvote-loading");
      await vote({
        variables: {
          postId: post.id,
          value: -1,
        },
        update: (cache) => updateAfterVote(-1, post.id, cache),
      });
      setVoteStatus(-1);
    } else {
      setLoadingState("upvote-loading");
      await vote({
        variables: {
          postId: post.id,
          value: 1,
        },
        update: (cache) => updateAfterVote(1, post.id, cache),
      });
      setVoteStatus(1);
    }

    setLoadingState("not-loading");
  };

  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      h="20px"
      width="4rem"
    >
      <IconButton
        variant="ghost"
        aria-label="upvote post"
        icon={
          post.voteStatus === 1 ? (
            <AiFillHeart color="pink" size={variant} />
          ) : (
            <AiOutlineHeart color="pink" size={variant} />
          )
        }
        borderBottomRadius="10px"
        onClick={async () => {
          handleVote();
        }}
        colorScheme={post.voteStatus === 1 ? "black" : undefined}
        isLoading={loadingState === "upvote-loading"}
      />
      <Text fontSize={["sm", "md", "lg"]}>{post.points}</Text>
    </Flex>
  );
};
