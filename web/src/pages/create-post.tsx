import { Box, Button } from "@chakra-ui/react";
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


const CreatePost: React.FC<{}> = ({}) => {

    const router = useRouter();
    useIsAuth()
    const [, createPost] = useCreatePostMutation()

    const [state, setState] = useState({
        name: ''
    });
    const [picture, setPicture] = useState('')
    const [, s3Sign] = useS3SignMutation()
  
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.files)
      // setState({file: e.target.files[0]});
      submit(e!.target!.files[0])
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
      const date = new Date().toDateString();
      const randomString = Math.random()
        .toString(36)
        .substring(2, 7);
      const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const newFilename = `audio/${date}-${randomString}-${cleanFileName}`;
      return newFilename.substring(0, 60);
    };
  
    const submit = async (file: File) => {

      const response = await s3Sign({
            filename: formatFilename(file.name),
            filetype: file.type
      });

      const { signedRequest, url } = response!.data.signS3;

      console.log('upload file: signedrequest:::', response)
      const result = await uploadToS3(file, signedRequest);

      const imageUrl = url.split('?')[0]
      setPicture(imageUrl)
    };

    return (
        <Layout variant="small">
            <Formik 
            initialValues={{ title: '', text: '' }} 
            onSubmit={ async (values) => {
                console.log(values)
                const { error } = await createPost({input: values })
                console.log('submit post err!!!', error)
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
                    <Box>
                        <input name="name" onChange={onChange} value={state.name} />
                        <input onChange={(e) => {
                            onChange(e)
                            // console.log("e.target.file",e!.target!.files[0].name)
                            const fileName = formatFilename(e!.target!.files[0].name)
                            setFieldValue("fileName", fileName)
                            }} type="file" accept="image/*"></input>
                        {picture !== '' ? <img src={picture}></img> : null}
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