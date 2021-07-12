import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import React from "react";
import { router } from "websocket";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import login from "../login";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Link, Flex } from "@chakra-ui/react";
import NextLink from 'next/link';

const ChangePassword: NextPage<{token: string}> = ({token}) => {
    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState('');
    return (
        <Wrapper variant="small">
        <Formik 
            initialValues={{ newPassword: '' }} 
            onSubmit={ async (values, { setErrors }) => {
                const response = await changePassword({newPassword: values.newPassword, token})
                if (response.data?.changePassword.errors) {
                    const errorMap = toErrorMap((response.data.changePassword.errors))
                    if('token' in errorMap) {
                        setTokenError(errorMap.token)
                    }
                    setErrors(errorMap)
                    
                } else if (response.data?.changePassword.user) {
                    // worked
                    router.push('/');
                }
        }}>
            {({ isSubmitting }) => (
                <Form>
                    <InputField 
                    name='newPassword' 
                    placeholder='new password' 
                    label='New Password'
                    type='password' />
                    {tokenError ? 
                    <Flex>
                        <Box mr={4 } color="red">{tokenError}</Box>
                        <NextLink href="/forgot-password">
                        <Link>Get New Token</Link>
                        </NextLink>
                    </Flex>
                     : null}
                    <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme="teal">Change Password</Button>
                </Form>
                
            )}
        </Formik>
        </Wrapper>
    );
}

ChangePassword.getInitialProps = ({query}) => {
    return {
        token: query.token as string,
    };
}

export default withUrqlClient(createUrqlClient)(ChangePassword);