import {
  Box,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
  Image,
  Button
} from "@chakra-ui/react";
import React, { ReactElement, useState, useContext } from "react";
import * as Yup from "yup";
import { formTypes } from "../../utils/FormModel/postFormModel";
import InfoForm from "./InfoForm";

interface Props {
  props: formTypes;
}

function ImageForm(props): ReactElement {
  const { formProps, formField } = props;
  const { values, setFieldValue } = formProps;
  const [pictureName, setPictureName] = useState("");
  const [picture, setPicture] = useState<string>();

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

  return (
    <Flex
      mt={0}
      width={["20rem", "30rem", "50rem"]}
      height="20rem"
      display="flex"
      alignItems="space-evenly"
      p={10}
      shadow="md"
      borderWidth="1px"
      flexDirection="row"
      bgColor="blackAlpha.400"
      borderBottomRadius="30px"
      borderColor="pink.200"
      borderTop="none"
    >
      <Box mx={2}>
        <FormControl>
          <Flex className="scale-anm" >
          
          {picture ? (
            <Box >
            <Image
            boxSize={["32", "60"]}
            borderRadius="2rem"
            border="1px"
            borderColor="pink"
            className="portfolio-img"
            src={picture}
            alt=""
            objectFit="cover"
          />
          
          </Box>
          ) : (
            <Box >
            <Input
              boxSize={["40", "78"]}
              className="image-file"
              bgColor="whiteAlpha.400"
              onChange={(e) =>{
                setFieldValue("image", e.target.files)
                setPictureName(e.target.files[0].name)
                const image = URL.createObjectURL(e.target.files[0]);
                setPicture(image)
              }}
              name="image"
              id="file"
              type="file"
              accept="image/*"
              mt={2}
            />
            <Box className="input-overlay" borderRadius="2rem">
              <Text className="port-text">add artwork</Text>
            </Box>
            </Box>

          )}
          </Flex>
          {/* <Text>{pictureName}</Text> */}
        </FormControl>
      </Box>
      <Box mx={2} width="100%">
        <FormControl>
          <InfoForm formField={formField} />
        </FormControl>
      </Box>
    </Flex>
  );
}

export default ImageForm;
