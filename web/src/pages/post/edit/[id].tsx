import { Box, FormLabel, Textarea, Button, Flex } from "@chakra-ui/react";
import { Wrapper } from "components/Wrapper";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import router, { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  usePostQuery,
  usePostsQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";
import { useGetPostFromUrl } from "../../../utils/useGetPostfromUrl";
import createPost from "../../create-post";

const EditPost = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const pause = intId === -1;
  const [{ data, fetching }] = usePostQuery({
    pause: pause,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();
  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>We couldn't find that post...</Box>
      </Layout>
    );
  }

  return (
    <Wrapper>
      <Flex w="100%" justifyContent="center">
        <Box
          mt={0}
          width="30rem"
          display="flex"
          justifyContent="center"
          p={10}
          shadow="md"
          borderWidth="1px"
          flexDirection="row"
          bgColor="blackAlpha.400"
          borderBottomRadius="30px"
          borderColor="pink.200"
          borderTop="none"
        >
          <Formik
            initialValues={{ title: data.post.title, text: data.post.text }}
            onSubmit={async (values) => {
              await updatePost({ id: intId, ...values });
              router.back();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField name="title" placeholder="title" label="Title" />
                <Box mt={4}>
                  <InputField
                    textarea
                    name="text"
                    placeholder="text..."
                    label="Body"
                  />
                </Box>
                <Flex justifyContent="center">
                  <Button
                    mt={4}
                    type="submit"
                    isLoading={isSubmitting}
                    colorScheme="pink"
                  >
                    update post
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
