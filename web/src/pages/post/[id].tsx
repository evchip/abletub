import { Box, Heading } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { AudioPlayer } from '../../components/audioPlayer'
import { EditDeletePostBtns } from '../../components/EditDeletePostBtns'
import { Layout } from '../../components/Layout'
import { usePostQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useGetPostFromUrl } from '../../utils/useGetPostfromUrl'
import PlayPauseAudio from "../../components/PlayPauseAudio"

const Post = ({}) => {

    const [{data, error, fetching}] = useGetPostFromUrl()

    if (fetching) {
        return (
            <Layout>
                <div>loading....</div>
            </Layout>
        )
    }

    if (error) {
        return <div>{error.message}</div>
    }

    if (!data?.post) {
        return (
        <Layout>
            <Box>We couldn't find that post...</Box>
        </Layout>
        )
    }
    return (
        <Layout>
            <Heading mb={4}>{data.post.title}</Heading>
            <Box>
                {data.post.text}
            </Box>
            <Box>
                <PlayPauseAudio/>
            </Box>
            <Box ml="auto">
                <EditDeletePostBtns 
                    id={data.post.id} 
                    creatorId={data.post.creator.id} 
                />
            </Box>
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Post);