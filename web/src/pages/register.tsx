import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/FormFields/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "components/Layout";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Layout >
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
          initialValues={{ email: "", username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({ options: values });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              // worked
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="rlgrime92"
                label="username"
              />
              <Box mt={4}>
                <InputField name="email" placeholder="henry@core.com" label="email" />
              </Box>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="vO!d^Mons00n"
                  label="password"
                  type="password"
                />
              </Box>
              <Flex mt={8} justifyContent="center">
              <Button
                
                type="submit"
                isLoading={isSubmitting}
                colorScheme="pink"
              >
                Register
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

export default withUrqlClient(createUrqlClient)(Register);
