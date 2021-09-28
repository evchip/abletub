import { Box, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useCreateCommentMutation } from "generated/graphql";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React, { ReactElement } from "react";
import { createUrqlClient } from "utils/createUrqlClient";
import { useGetPostFromUrl } from "utils/useGetPostfromUrl";
import { withApollo } from "utils/withApollo";
import { InputField } from "../FormFields/InputField";

interface Props {
  postId: number;
}

function CreateComment({ postId }: Props): ReactElement {
  const [createComment] = useCreateCommentMutation();

  return (
    <Box variant="small" display="flex" direction="row" width="100%">
      <Formik
        initialValues={{ text: "" }}
        onSubmit={async (values, { resetForm }) => {
          const { errors } = await createComment({
            variables: { postId, input: values },
            update: (cache) => {
              cache.evict({ fieldName: "comments" });
            },
          });

          if (errors) {
            console.log("error", errors);
          } else {
            resetForm({ values: { text: "" } });
            router.push(`/post/${postId}`);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Flex width="100%">
            <Form style={{ width: "100%" }}>
              <Flex
                w="100%"
                direction={["column", "row"]}
                alignItems="center"
                justifyContent="space-between"
              >
                <Flex mt={4} width="85%" justifyContent="flex-start">
                  <InputField
                    size=""
                    textarea
                    name="text"
                    placeholder="tell them what you think"
                    label=""
                  />
                </Flex>
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="pink"
                >
                  comment
                </Button>
              </Flex>
            </Form>
          </Flex>
        )}
      </Formik>
    </Box>
  );
}

export default CreateComment;
