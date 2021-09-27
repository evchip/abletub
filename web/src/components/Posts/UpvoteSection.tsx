import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Post, useVoteMutation, User } from "../../generated/graphql";

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

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({
  post,
  variant,
  fontVariant,
}) => {
  const [loadingState, setLoadingState] = useState<
    "upvote-loading" | "downvote-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  const [voteStatus, setVoteStatus] = useState(post.voteStatus);

  const handleVote = async () => {
    if (post.voteStatus !== voteStatus) {
      return;
    }
    if (post.voteStatus === 1) {
      setLoadingState("downvote-loading");
      await vote({
        postId: post.id,
        value: -1,
      });
      setVoteStatus(-1);
    } else {
      setLoadingState("upvote-loading");
      await vote({
        postId: post.id,
        value: 1,
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
      <Text fontSize={fontVariant}>{post.points}</Text>
    </Flex>
  );
};
