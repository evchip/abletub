import { Box, Button, Flex } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useCreateCommentMutation } from 'generated/graphql';
import router from 'next/router';
import createPost from 'pages/create-post';
import React, { ReactElement } from 'react'
import { InputField } from './InputField';
import { Layout } from './Layout';


interface Props {
    postId: number
}

function CreateComment({postId}: Props): ReactElement {

    const [, createComment] = useCreateCommentMutation()
    return (
        <Box variant="small" display="flex" direction="row" width="100%">
            <Formik 
            initialValues={{ text: ''}} 
            onSubmit={ async (values) => {
                
                const {error } = await createComment({postId, input: values})
                console.log("error", error)
                if (error) {
                    console.log("error", error)
                } else {
                    router.push(`/post/${postId}`);
                }
            }}>
            {({ isSubmitting }) => (
                <Flex direction="row" width="100%">
                <Form >
                    <Box mt={4} width="500px">
                        <InputField textarea name="text" placeholder="Tell them what you think" label="Comment" />
                    </Box>
                    <Button 
                        mt={4} 
                        type='submit' 
                        isLoading={isSubmitting} 
                        colorScheme="teal"
                    >
                        Comment
                    </Button>
                </Form>
                </Flex>
                
            )}
            </Formik>
        </Box>
    )
}

export default CreateComment
