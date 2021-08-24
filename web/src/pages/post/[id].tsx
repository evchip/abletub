import { Box, Heading } from '@chakra-ui/react'
import UploadFile from 'components/UploadFileFC'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { EditDeletePostBtns } from '../../components/EditDeletePostBtns'
import { Layout } from '../../components/Layout'
import PlayPauseAudio from "../../components/PlayPauseAudio"
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useGetPostFromUrl } from '../../utils/useGetPostfromUrl'
import axios from "axios";
import { useState } from 'react'


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
                <p>{data.post.filename}</p>
                {/* <img src={data.post.filename}/> */}
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