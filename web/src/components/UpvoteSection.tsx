import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

interface UpvoteSectionProps {
    post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({post}) => {
    // console.log('post', post)
    const [loadingState, setLoadingState] = useState<'upvote-loading' | 'downvote-loading' | 'not-loading'>('not-loading')
    const [, vote] = useVoteMutation();

    return (
        <Flex direction="column" alignItems="center" justifyContent="center" mr={4}>
            <IconButton
            aria-label="upvote post"
            icon={<ChevronUpIcon />}
            
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
            {post.points}
            <IconButton
            aria-label="downvote post"
            icon={<ChevronDownIcon />}
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
