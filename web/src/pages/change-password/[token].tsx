import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import NextLink from 'next/link';
import React, { useState } from "react";
import { withApollo } from "utils/withApollo";
import { InputField } from "../../components/FormFields/InputField";
import { Wrapper } from "../../components/Wrapper";
import { MeDocument, MeQuery, useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";

const ChangePassword: NextPage = () => {
    const router = useRouter();
    const [changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState('');
    return (
        <Wrapper variant="small">
        <Formik 
            initialValues={{ newPassword: '' }} 
            onSubmit={ async (values, { setErrors }) => {
                const response = await changePassword({variables: {
                    newPassword: values.newPassword,
                    token: 
                        typeof router.query.token === 'string' ? router.query.token : ""
                }, update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        me: data?.changePassword.user,
                      },
                    });
                    cache.evict({fieldName: 'posts:{}'})
                  },})
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
                    size=""
                    textarea={false}
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

export default withApollo({ssr: false})(ChangePassword);