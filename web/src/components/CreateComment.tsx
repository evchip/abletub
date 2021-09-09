import { Box, Button, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useCreateCommentMutation } from "generated/graphql";
import router from "next/router";
import React, { ReactElement } from "react";
import { InputField } from "./InputField";

interface Props {
  postId: number;
  getNewComment(postId: number, values: { text: string }): void;
}

function CreateComment({ postId, getNewComment }: Props): ReactElement {

  const [, createComment] = useCreateCommentMutation();

  return (
    <Box variant="small" display="flex" direction="row" width="100%">
      <Formik
        initialValues={{ text: "" }}
        onSubmit={async (values) => {
          const { error } = await createComment({ postId, input: values });
          
          if (error) {
            console.log("error", error);
          } else {
            getNewComment(postId, values)

            // router.push(`/post/${postId}`);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Flex direction="row" width="100%">
            <Form style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"}}>
              <Box mt={4} width="85%" >
                <InputField
                  textarea
                  name="text"
                  placeholder="Tell them what you think"
                  label=""
                />
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="pink"
              >
                comment
              </Button>
            </Form>
          </Flex>
        )}
      </Formik>
    </Box>
  );
}

export default CreateComment;
