import { Box, Button, Text, Input, Flex, Heading } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";
import { useS3SignMutation } from "../generated/graphql";
import axios from "axios";
import * as Yup from "yup";
import { Web3Storage } from "web3.storage";
import UploadTrack from "components/UploadTrack";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();
  const [imageSignedReq, setImageSignedReq] = useState("");
  const [audioSignedReq, setAudioSignedReq] = useState("");
  const [audioFile, setAudioFile] = useState<File>();
  const [imageFile, setImageFile] = useState<File>();
  const [pictureName, setPictureName] = useState("");
  const [, s3Sign] = useS3SignMutation();
  const [{ data, fetching }] = useMeQuery();
  const [CIDAddress, setCIDAddress] = useState("")

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

  const validateText = (value: string, maxLength: number) => {
    let error;
    if (!value) {
      error = "required";
    } else if (value.length > maxLength) {
      error = "sorry, that's too long";
    }
    return error;
  };
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    if (!e.target.files) {
      return;
    }
    const result = await submitSignReq(e.target!.files[0]!);
    return result;
  };

  const uploadToS3 = async (file: { type: any }, signedRequest: string) => {
    const options = {
      headers: {
        ContentType: file.type,
      },
    };
    const result = await axios.put(signedRequest, file, options);
    return result;
  };

  const formatFilename = (filename: string, filetype: string) => {
    let current_datetime = new Date();
    let date =
      current_datetime.getDate() +
      "-" +
      current_datetime.getMonth() +
      "-" +
      current_datetime.getFullYear();
    const randomString = Math.random().toString(36).substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const fileExtension = cleanFileName.substr(
      cleanFileName.length - 3,
      cleanFileName.length
    );
    let newFilename = `0000/${date}-${randomString}-${cleanFileName}.${fileExtension}`;
    if (fetching === false) {
      newFilename = `${
        data!.me?.username
      }/${date}-${randomString}-${cleanFileName}.${fileExtension}`;
    }

    return newFilename;
  };

  const submitSignReq = async (file: File) => {
    const response = await s3Sign({
      filename: formatFilename(file.name, file.type),
      filetype: file.type,
    });
    if (!response?.data?.signS3) {
      return;
    }
    const { signedRequest, url } = response.data!.signS3;

    const fileUrl = url.split("?")[0];

    if (file.type === "audio/mpeg") {
      setAudioSignedReq(signedRequest);
      setAudioFile(file);
    } else {
      setImageSignedReq(signedRequest);
      setImageFile(file);
    }
    return fileUrl;
  };


  // IPFS
  const uploadToIPFS = async (files: File[]) => {

    const getAccessToken = () => {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGY5RGIxZDcwNzI2NjBCNjM4YjI0QWIwQjFGOEQ5OGFGZWNhZTlERUYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzIxNjk0NTI3NjcsIm5hbWUiOiJhYmxldHViIn0.fFhf0CfKqDOST6pADwgrffCz4P2AU5_FwmLOcMcxws4" as string;
      }

    const makeStorageClient = () => {
        const client = new Web3Storage({ token: getAccessToken() })
        return client
      }

    const storeFiles = async (files: File[]) => {
        const client = makeStorageClient()
        console.log('client', client)
        const cid = await client.put(files)
        console.log('stored files with cid:', cid)
        setCIDAddress(cid)
        return cid
    }

    const result = await storeFiles(files)
    return result
    
  }

  const makeFileObjects = async (uploads: FileList | null) => {
    console.log('uploads', uploads)

    if (uploads) {
      await uploads[0].arrayBuffer().then((res) => {

        const blob = new Blob([new Uint8Array(res)], {type : 'file'})
        console.log('blob', blob)
        const files = [
          new File(['contents-of-file-1'], 'plain-utf8.txt'),
          new File([blob], uploads[0].name)
        ]
        const CID = uploadToIPFS(files)
        return CID
      })
       
    } else {
      return null
    }

  }

  return (
    <Layout variant="small">
      <Box display="flex" justifyContent="center">
        <Heading >upload your track</Heading>
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
          
          if (audioFile) {
            await uploadToS3(audioFile!, audioSignedReq);
          }
          if (imageFile) {
            await uploadToS3(imageFile!, imageSignedReq);
          }

          const { error } = await createPost({
            input: {
              title: values.title,
              text: values.text,
              audioFileName: values.audioFileName,
              imageFileName: CIDAddress,
            },
          });
          if (error) {
            console.log("error", error);
          } else {
            router.push("/");
          }
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
            <Box mt={4} pb={2}>
              <Text mb={2}>song title</Text>
              <Field
                id="title-field"
                className="field"
                name="title"
                placeholder="title"
                label="song title"
                validate={() => validateText(values.title, 45)}
              />
              {errors.title && touched.title && (
                <Text mt={1} color="red.200">
                  {errors.title}
                </Text>
              )}
            </Box>
            <Box mt={4} pb={2}>
              <InputField
                name="text"
                textarea
                placeholder="talk about your song"
                label="description"
              />
            </Box>
            <Box mt="4">
              <Text>upload image ({"<"} 15 mb)</Text>
              <Input
                onChange={async (e) => {
                  await makeFileObjects(e.target.files)
                  const imageFileName = await onChange(e);
                  setFieldValue("imageFileName", imageFileName);

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
            <Box mt={4}>
              <Text>upload audio ({"<"} 50 mb)</Text>
              <Input
                onChange={async (e) => {
                  const audioFileName = await onChange(e);
                  if (e!.target!.files![0]) {
                    setFieldValue("audioFileName", audioFileName);
                    setFieldValue("audioFileSize", e!.target!.files![0].size);
                  }
                  
                  
                }}
                name="audio"
                mt={2}
                id="file"
                className="audio-file"
                type="file"
                accept=".mp3"
              ></Input>
              {errors.audioFileSize && touched.audioFileSize ? (
                <Text color="red.200">{errors.audioFileSize}</Text>
              ) : null}
            </Box>
            <Flex justifyContent="center">
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="pink"
              >
                create post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
      <UploadTrack />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
