import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

interface UpvoteSectionProps {
    post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({post}) => {

    const [loadingState, setLoadingState] = useState<'upvote-loading' | 'downvote-loading' | 'not-loading'>('not-loading')
    const [, vote] = useVoteMutation();

    return (
        <Flex direction="column" alignItems="center" justifyContent="center">
            <IconButton
            aria-label="upvote post"
            
            icon={<ChevronUpIcon boxSize="2em"/>}
            
            onClick={async () => {
                if (post.voteStatus === 1) {
                    return;
                }
                setLoadingState('upvote-loading')
                await vote({
                    postId: post.id,
                    value: 1
                    });
                setLoadingState('not-loading');
            }}
            colorScheme={post.voteStatus === 1 ? "green" : undefined}
            isLoading={loadingState==='upvote-loading'}
            />
            <Text fontSize="16px">{post.points}</Text>
            <IconButton
            aria-label="downvote post"
            icon={<ChevronDownIcon boxSize="2em" />}
            onClick={async () => {
                if (post.voteStatus === -1) {
                    return;
                }
                setLoadingState('downvote-loading')
                await vote({
                    postId: post.id,
                    value: -1
                    });
                setLoadingState('not-loading');
            }}
            colorScheme={post.voteStatus === -1 ? "red" : undefined}
            isLoading={loadingState==='downvote-loading'}
            />
        </Flex>
    )
}
