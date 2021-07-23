import { ApolloCache } from '@apollo/client'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import gql from 'graphql-tag'
import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import { PostSnippetFragment, useVoteMutation, VoteMutation, _Post as Post } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

interface UpvoteSectionProps {
    post: PostSnippetFragment;
}

const updateAfterVote = (value: number, postId: number, cache: ApolloCache<VoteMutation>) => {
    
    const data = cache.readFragment<{
        id: number
        points: number
        voteStatus: number | null;
    }>({
        id: '_Post:' + postId,
        fragment: gql`
            fragment __ on _Post {
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
            id: '_Post:' + postId,
            fragment: gql`
            fragment __ on _Post {
                points
                voteStatus
            }
            `,
            data: { points: newPointValue, voteStatus: value } as any
        });
    }
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({post}) => {

    const [loadingState, setLoadingState] = useState<'upvote-loading' | 'downvote-loading' | 'not-loading'>('not-loading')
    const [vote] = useVoteMutation();

    return (
        <Flex direction="column" alignItems="center" justifyContent="center" mr={4}>
            <IconButton
            aria-label="upvote post"
            
            icon={<ChevronUpIcon boxSize="2em"/>}
            
            onClick={async () => {
                if (post.voteStatus === 1) {
                    return;
                }
                setLoadingState('upvote-loading')
                await vote({
                    variables: {
                        postId: post.id,
                        value: 1
                    },
                    update: (cache) => updateAfterVote(1, post.id, cache)
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
                    variables: {
                        postId: post.id,
                        value: -1
                    },
                    update: (cache) => updateAfterVote(-1, post.id, cache)
                });
                setLoadingState('not-loading');
            }}
            colorScheme={post.voteStatus === -1 ? "red" : undefined}
            isLoading={loadingState==='downvote-loading'}
            />
        </Flex>
    )
}
