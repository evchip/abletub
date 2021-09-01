import { Box, Button, extendTheme } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";
// import  UploadFile from "../components/UploadFileFC"
import {useS3SignMutation} from "../generated/graphql"
import axios from "axios";
const AmazonS3URI = require('amazon-s3-uri')

const theme = extendTheme({
    textStyles: {
      h1: {
        // you can also use responsive styles
        fontSize: ["48px", "72px"],
        fontWeight: "bold",
        lineHeight: "110%",
        letterSpacing: "-2%",
      },
      h2: {
        fontSize: ["36px", "48px"],
        fontWeight: "semibold",
        lineHeight: "110%",
        letterSpacing: "-1%",
      },
    },
  })

const CreatePost: React.FC<{}> = ({}) => {

    const router = useRouter();
    useIsAuth()
    const [, createPost] = useCreatePostMutation()

    const [fileName, setFilenNme] = useState({
        name: ''
    });
    const [picture, setPicture] = useState('')
    const [, s3Sign] = useS3SignMutation()
  
    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
        // setState({file: e.target.files[0]});
        if (!e.target.files) {
            return
        }
        const result = await submit(e.target!.files[0]!)
        return result
    };
  
    const uploadToS3 = async (file: { type: any; }, signedRequest: string) => {
      const options = {
        headers: {
            "ContentType": file.type
        }
      };
      const result = await axios.put(signedRequest, file, options);
      return result
    };
  
    const formatFilename = (filename: string) => {
      let current_datetime = new Date()
      let date = current_datetime.getDate() + "-" + current_datetime.getMonth() + "-" + current_datetime.getFullYear()
      const randomString = Math.random()
        .toString(36)
        .substring(2, 7);
      const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const newFilename = `audio/${date}-${randomString}-${cleanFileName}.mp3`;
      return newFilename.substring(0, 68);
    };
  
    const submit = async (file: File) => {

      const response = await s3Sign({
            filename: formatFilename(file.name),
            filetype: file.type
      });
      console.log('response from s3Sign', response)
      if (!response!.data!.signS3) {
          return
      }
      const { signedRequest, url } = response.data!.signS3;
      const result = await uploadToS3(file, signedRequest);
      console.log('result from s3 sign', result)
      const imageUrl = url.split('?')[0]
      setPicture(imageUrl)
      return imageUrl
    };

    return (
        <Layout variant="small">
            <Formik 
            initialValues={{ title: '', text: '' , fileName: ''}} 
            onSubmit={ async (values) => {
                const { error } = await createPost({input: values })
                console.log('submit post err', error)
                if (!error) {
                    router.push('/');
                }
                
            }}>
            {({ isSubmitting, setFieldValue }) => (
                <Form>
                    <InputField 
                        name='title' 
                        placeholder='title' 
                        label='Title' 
                    />
                    <Box mt={4}>
                    <InputField textarea name="text" placeholder="text" label="Body" />
                    </Box>
                    <Box mt="4">
                    <Box textStyle="h1">Upload Image</Box>
                        <input name="name" onChange={onChange} value={fileName.name} />
                        <input onChange={ async (e) => {
                            
                            const fileName = await onChange(e)
                            setFieldValue("fileName", fileName)
                            }} type="file" accept="image/*"></input>
                        {picture !== '' ? <img src={picture}></img> : null}
                    </Box>
                    <Box mt="4">
                        <Box textStyle="h1">Upload Audio</Box>
                        <input name="name" onChange={onChange} value={fileName.name} />
                        <input onChange={ async (e) => {
                            console.log("event", e.target.files)
                            const fileName = await onChange(e)
                            setFieldValue("fileName", fileName)
                            }} type="file" accept=".mp3"></input>
                    </Box>
                    <Button 
                        mt={4} 
                        type='submit' 
                        isLoading={isSubmitting} 
                        colorScheme="teal"
                    >
                        Create Post
                    </Button>
                </Form>
                
            )}
            </Formik>
        </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost);