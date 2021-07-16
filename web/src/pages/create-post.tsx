import { Box, Button, FormLabel, Textarea } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from 'next/router';
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {

    const router = useRouter();
    useIsAuth()
    const [, createPost] = useCreatePostMutation()
    return (
        <Layout variant="small">
            <Formik 
            initialValues={{ title: '', text: 'qqq' }} 
            onSubmit={ async (values) => {
                const { error } = await createPost({input: values })
                console.log('err!', error)
                if (!error) {
                    router.push('/');
                }
                console.log('values', values)
                
            }}>
            {({ isSubmitting }) => (
                <Form>
                    <InputField 
                        name='title' 
                        placeholder='title' 
                        label='Title' 
                    />
                    <Box mt={4}>
                    <FormLabel htmlFor='text'>Body</FormLabel>
                    <Textarea
                        name='text' 
                        placeholder='text...' 
                        label='Text'
                    />
                    </Box>
                    <Button 
                        mt={4} 
                        type='submit' 
                        isLoading={isSubmitting} 
                        colorScheme="teal"
                    >
                        Create Post
                    </Button>
                </Form>
                
            )}
            </Formik>

        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost);