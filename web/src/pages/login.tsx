import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Link, Flex } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

interface loginProps {}

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper>
      <Box
        width="30%"
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
            const response = await login(values);

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
                name="usernameOrEmail"
                placeholder="username or email"
                label="username or email"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="password"
                  type="password"
                />
              </Box>
              <Flex mt={2}>
                <Box ml="auto">
                  <NextLink href="/forgot-password">
                    <Link>forgot password?</Link>
                  </NextLink>
                </Box>
              </Flex>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="pink"
              >
                login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
