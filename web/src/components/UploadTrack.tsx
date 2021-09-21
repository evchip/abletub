import { Box, Heading, Input, Flex, Button, Text } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import router from "next/router";
import createPost from "pages/create-post";
import React, { ReactElement, useState } from "react";
import { Web3Storage } from "web3.storage";
import { InputField } from "./InputField";
import { Layout } from "./Layout";
import { ChevronRightIcon } from "@chakra-ui/icons";
import * as Yup from "yup";

interface Props {}

function UploadTrack({}: Props): ReactElement {
  const [CIDAddress, setCIDAddress] = useState("");
  const [pictureName, setPictureName] = useState("");

  const PostSchema = Yup.object().shape({
    audioFileSize: Yup.number()
      .min(1, "please upload a file.")
      .max(50000000, "file is too large. max size is 50 MB.")
      .required("required"),
    imageFileSize: Yup.number()
      .min(1, "please upload a file.")
      .max(15000000, "file is too large. max size is 12 MB.")
      .required("required"),
  });

  // IPFS
  const uploadToIPFS = async (files: File[]) => {
    const getAccessToken = () => {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGY5RGIxZDcwNzI2NjBCNjM4YjI0QWIwQjFGOEQ5OGFGZWNhZTlERUYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzIxNjk0NTI3NjcsIm5hbWUiOiJhYmxldHViIn0.fFhf0CfKqDOST6pADwgrffCz4P2AU5_FwmLOcMcxws4" as string;
    };

    const makeStorageClient = () => {
      const client = new Web3Storage({ token: getAccessToken() });
      return client;
    };

    const storeFiles = async (files: File[]) => {
      const client = makeStorageClient();
      console.log("client", client);
      const cid = await client.put(files);
      console.log("stored files with cid:", cid);
      setCIDAddress(cid);
      return cid;
    };

    const result = await storeFiles(files);
    return result;
  };

  const makeFileObjects = async (uploads: FileList | null) => {
    console.log("uploads", uploads);

    if (uploads) {
      await uploads[0].arrayBuffer().then((res) => {
        const blob = new Blob([new Uint8Array(res)], { type: "file" });
        console.log("blob", blob);
        const files = [
          new File(["contents-of-file-1"], "plain-utf8.txt"),
          new File([blob], uploads[0].name),
        ];
        const CID = uploadToIPFS(files);
        return CID;
      });
    } else {
      return null;
    }
  };
  return (
    <Flex>
      <Box display="flex" justifyContent="center">
        <Heading>upload your track</Heading>
      </Box>
      <Formik
        initialValues={{
          title: "",
          text: "",
          audioFileName: "",
          imageFileName: "",
          audioFileSize: 0,
          imageFileSize: 0,
        }}
        validationSchema={PostSchema}
        onSubmit={async (values) => {

        //   const { error } = await createPost({
        //     input: {
        //       title: values.title,
        //       text: values.text,
        //       audioFileName: values.audioFileName,
        //       imageFileName: CIDAddress,
        //     },
        //   });
        //   if (error) {
        //     console.log("error", error);
        //   } else {
        //     router.push("/");
        //   }
        }}
      >
        {({
          isSubmitting,
          setFieldValue,
          touched,
          isValidating,
          errors,
          values,
        }) => (

          <Form style={{ marginTop: "3rem", marginBottom: "3rem" }}>
            <Box mt="4">
              <Text>upload image ({"<"} 15 mb)</Text>
              <Input
                onChange={async (e) => {
                  await makeFileObjects(e.target.files);
                  setFieldValue("imageFileName", e.target.files[0].name);

                  if (e!.target!.files![0]) {
                    setPictureName(e!.target!.files![0].name!);
                    setFieldValue("imageFileSize", e.target.files![0].size);
                  }
                }}
                name="image"
                id="file"
                className="image-file"
                type="file"
                accept="image/*"
                mt={2}
              />
              {errors.imageFileSize && touched.imageFileSize ? (
                <Text mt={1} color="red.200">
                  {errors.imageFileSize}
                </Text>
              ) : null}
              <Text>{pictureName}</Text>
            </Box>
            <Flex justifyContent="center">
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="pink"
                rightIcon={<ChevronRightIcon />}
              >
                continue
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}

export default UploadTrack;
