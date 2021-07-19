import { Box, Heading } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { Layout } from '../../components/Layout'
import { usePostQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils/createUrqlClient'


const Post = ({}) => {
    const router = useRouter();
    const intId = typeof router.query.id === 'string' ? parseInt(router.query.id) : -1
    const pause = intId === -1
    const [{data, error, fetching}] = usePostQuery({
        pause: pause,
        variables: {
            id: intId
        }
    })
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
        return <Layout>
            <Box>We couldn't find that post...</Box>
        </Layout>
    }
    return (
        <Layout>
            <Heading mb={4}>{data.post.title}</Heading>
            {data.post.text}
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Post);