import { Box, FormLabel, Textarea, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql'
import router, { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import { usePostQuery, usePostsQuery, useUpdatePostMutation } from '../../../generated/graphql';
import { createUrqlClient } from '../../../utils/createUrqlClient';
import { useGetIntId } from '../../../utils/useGetIntId';
import { useGetPostFromUrl } from '../../../utils/useGetPostfromUrl';
import createPost from '../../create-post';


const EditPost = ({}) => {
    const router = useRouter()
    const intId = useGetIntId()
    const pause = intId === -1;
    const [{data, fetching}] = usePostQuery({
        pause: pause,
        variables: {
            id: intId
        }
    });
    const [, updatePost] = useUpdatePostMutation()
    if (fetching) {
        return (
            <Layout>
                <div>loading...</div>
            </Layout>
        )
    }

    if (!data?.post) {
        return (
            <Layout>
                <Box>We couldn't find that post...</Box>
            </Layout>
        )
    }

    return (
        <Layout variant="small">
        <Formik 
        initialValues={{ title: data.post.title, text: data.post.text }} 
        onSubmit={ async (values) => {

            await updatePost({id: intId, ...values})
            router.back();
            
        }}>
        {({ isSubmitting }) => (
            <Form>
                <InputField 
                    name='title' 
                    placeholder='title' 
                    label='Title' 
                />
                <Box mt={4}>
                <InputField
                    textarea
                    name='text' 
                    placeholder='text...' 
                    label='Body'
                />
                </Box>
                <Button 
                    mt={4} 
                    type='submit' 
                    isLoading={isSubmitting} 
                    colorScheme="teal"
                >
                    Update Post
                </Button>
            </Form>
        )}
        </Formik>

    </Layout>
    )
};

export default withUrqlClient(createUrqlClient)(EditPost);