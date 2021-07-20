import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';

interface EditDeletePostBtnsProps {
    id: number;
    creatorId: number
}

export const EditDeletePostBtns: React.FC<EditDeletePostBtnsProps> = ({
    id,
    creatorId
}) => {
    const [, deletePost] = useDeletePostMutation()
    const [{data: userData}] = useMeQuery()
    if (userData?.me.id !== creatorId) {
        return null;
    }
    return (
        <Flex>
            
            <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
                <IconButton
                as={Link}
                mb={4}
                aria-label="edit post"
                icon={<EditIcon/>}
                ml="auto"
                />
            </NextLink>
            
            <IconButton
                aria-label="delete post"
                icon={<DeleteIcon/>}
                onClick={async () => {
                    deletePost({ id })
                }}
                ml="auto"
            />
        </Flex>
    )
}
