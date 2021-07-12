import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React from 'react'
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useForgotPasswordMutation } from '../generated/graphql';
import { useState } from 'react';


const ForgotPassword: React.FC<{}> = ({}) => {
    const [complete, setComplete] = useState(false)
    const [, forgotPassword] = useForgotPasswordMutation()
    return (
        <Wrapper>
        <Formik 
            initialValues={{ email: ""}} 
            onSubmit={ async (values) => {
                await forgotPassword(values)
                setComplete(true)
        }}>
            {({ isSubmitting }) => complete ? <Box>if an account with that email exists, we sent you an email</Box> : (
                <Form>
                    <Box mt={4}>
                    <InputField name='email' placeholder='email' label='Email' type='email' />
                    </Box>
                    <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme="teal">Forgot Password </Button>
                </Form>
                
            )}
        </Formik>
        </Wrapper>
    )
}


export default withUrqlClient(createUrqlClient)(ForgotPassword)