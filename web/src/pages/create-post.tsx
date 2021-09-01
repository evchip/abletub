import { Box, Button, extendTheme } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation, useMeQuery } from '../generated/graphql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";
import {useS3SignMutation} from "../generated/graphql"
import axios from "axios";

const CreatePost: React.FC<{}> = ({}) => {

    const router = useRouter();
    useIsAuth()
    const [, createPost] = useCreatePostMutation()
    const [signedReq, setSignedReq] = useState('')
    const [audioFile, setAudioFile] = useState<File>()
    const [imageFile, setImageFile] = useState<File>()
    const [fileName, setFilenName] = useState({
        name: ''
    });
    const [picture, setPicture] = useState('')
    const [, s3Sign] = useS3SignMutation()
    const [{data, fetching}] = useMeQuery()
  
    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
        if (!e.target.files) {
            return
        }
        const result = await submitSignReq(e.target!.files[0]!)
        return result
    };
  
    const uploadToS3 = async (file: { type: any; }, signedRequest: string) => {
      const options = {
        headers: {
            "ContentType": file.type
        }
      };
      const result = await axios.put(signedRequest, file, options);
      console.log("axios result", result)
      return result
    };

  
    const formatFilename = (filename: string, filetype: string) => {
        console.log('filetype', filetype)
        console.log('data.me.id', data?.me?.id)
      let current_datetime = new Date()
      let date = current_datetime.getDate() + "-" + current_datetime.getMonth() + "-" + current_datetime.getFullYear()
      const randomString = Math.random()
        .toString(36)
        .substring(2, 7);
      const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const fileExtension = cleanFileName.substr((cleanFileName.length - 3), cleanFileName.length)
      const newFilename = `audio/${date}-${randomString}-${cleanFileName}.${fileExtension}`;

      return newFilename;
    };
  
    const submitSignReq = async (file: File) => {
    
      const response = await s3Sign({
            filename: formatFilename(file.name, file.type),
            filetype: file.type
      });
      if (!response?.data?.signS3) {
          return
      }
      const { signedRequest, url } = response.data!.signS3;
      setSignedReq(signedRequest)
      const fileUrl = url.split('?')[0]

      if (file.type === "audio/mpeg") {
        setAudioFile(file)
      } else {
        setImageFile(file)
        setPicture(fileUrl)
      }
      return fileUrl

    };

    return (
        <Layout variant="small">
            <Formik 
            initialValues={{ title: '', text: '' , fileName: ''}} 
            onSubmit={ async (values) => {
                console.log('values', values)
                const audioResult = await uploadToS3(audioFile!, signedReq);
                const imageResult = await uploadToS3(imageFile!, signedReq);
                const { error } = await createPost({input: values })
                if (error) {
                    console.log("error", error)
                } else {
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
                            const fileName = await onChange(e)
                            setFieldValue("fileName", fileName)
                            }} type="file" accept=".mp3">
                        </input>
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