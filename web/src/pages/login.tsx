import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from 'formik';
import { useRouter } from "next/dist/client/router";
import NextLink from 'next/link';
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from '../components/Wrapper';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface loginProps {

}

const Login: React.FC<{}> = ({}) => {
    const router = useRouter()
    const [login] = useLoginMutation();
    return (
        <Wrapper>
        <Formik 
            initialValues={{ usernameOrEmail: "", password: "" }} 
            onSubmit={ async (values, { setErrors }) => {
                const response = await login({variables: values, update: (cache, {data}) => {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            __typename: "Query",
                            me: data?.login.user
                        }
                    });
                    cache.evict({ fieldName: "posts:{}" })
                }});

                if (response.data?.login.errors) {
                    setErrors(toErrorMap(response.data.login.errors))
                } else if (response.data?.login.user) {
                    if (typeof router.query.next === 'string') {
                        // worked
                        router.push(router.query.next || '/');
                    } else {
                        router.push('/');
                    }
                    
                }
        }}>
            {({ isSubmitting }) => (
                <Form>
                    <InputField 
                    name='usernameOrEmail' 
                    placeholder='username or email' 
                    label='Username or Email' />
                    <Box mt={4}>
                    <InputField name='password' placeholder='password' label='Password' type='password' />
                    </Box>
                    <Flex mt={2}>
                        <Box ml="auto">
                            <NextLink href="/forgot-password">
                                <Link>forgot password?</Link>
                            </NextLink>
                        </Box>
                    </Flex>
                    <Button mt={4} type='submit' isLoading={isSubmitting} colorScheme="teal">Login</Button>
                </Form>
                
            )}
        </Formik>
        </Wrapper>
    );
}

export default withApollo({ ssr: false })(Login);