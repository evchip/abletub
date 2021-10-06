import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex } from "@chakra-ui/react";
import { InputField } from "../components/FormFields/InputField";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { Layout } from "components/Layout";
import withApollo from "utils/withApollo";

interface loginProps {}

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <Layout>
      <Flex w="100%" justifyContent="center">
        <Box
          width="20rem"
          display="flex"
          justifyContent="center"
          p={10}
          mt="0"
          shadow="md"
          borderWidth="1px"
          flexDirection="row"
          bgColor="blackAlpha.400"
          borderBottomRadius="30px"
          borderColor="pink.200"
          borderTop="none"
        >
          <Formik
            initialValues={{ usernameOrEmail: "", password: "" }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({
                variables: values,
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: "Query",
                      me: data?.login.user,
                    },
                  });
                  cache.evict({fieldName: 'posts:{}'})
                },
              });

              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data?.login.user) {
                if (typeof router.query.next === "string") {
                  // worked
                  router.push(router.query.next || "/");
                } else {
                  router.push("/");
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  size={""}
                  textarea={false}
                  name="usernameOrEmail"
                  placeholder="rlgrime92"
                  label="username or email"
                />
                <Box mt={4}>
                  <InputField
                    size={""}
                    textarea={false}
                    name="password"
                    placeholder="vO!d^Mons00n"
                    label="password"
                    type="password"
                  />
                </Box>
                {/* <Flex mt={2}>
                <Box ml="auto">
                  <NextLink href="/forgot-password">
                    <Link><Text>forgot password?</Text></Link>
                  </NextLink>
                </Box>
              </Flex> */}
                <Flex mt={8} justifyContent="center">
                  <Button
                    mt={4}
                    type="submit"
                    isLoading={isSubmitting}
                    colorScheme="pink"
                  >
                    login
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Layout>
  );
};

export default withApollo(Login);
