import {
  Box,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { FormikHelpers, useField, FormikProps } from "formik";
import React, { ReactElement, useState, useContext } from "react";
import * as Yup from "yup";
import { formTypes } from "../../utils/FormModel/postFormModel";
import { InfoForm } from "./InfoForm";

interface Props {
  formField: formTypes;
  formProps: FormikProps<{ [x: string]: string }> &
    FormikHelpers<{}> & { name: string };
}

const ImageForm: React.FC<Props> = ({ formField, formProps }): ReactElement => {
  const { values, setFieldValue, touched, errors, ...rest } = formProps;
  const { image } = formField;
  const [field, meta] = useField(formProps);
  meta.touched = false;
  const [picture, setPicture] = useState<string>();

  return (
    <Flex
      mt={0}
      width={["20rem", "30rem", "50rem"]}
      height={["40rem", "40rem", "20rem"]}
      display="flex"
      alignItems="space-evenly"
      p={10}
      shadow="md"
      borderWidth="1px"
      direction={["column", "column", "row"]}
      bgColor="blackAlpha.400"
      borderBottomRadius="30px"
      borderColor="pink.200"
      borderTop="none"
    >
      <Box mx={2}>
        <FormControl isInvalid={meta.touched && !!meta.error}>
          <Flex className="scale-anm" justifyContent="center">
            {picture ? (
              <Box display="flex" justifyContent="center">
                <Image
                  boxSize={["48", "60"]}
                  borderRadius="2rem"
                  border="1px"
                  borderColor="whiteAlpha.400"
                  className="portfolio-img"
                  src={picture}
                  alt=""
                  objectFit="cover"

                />
              </Box>
            ) : (
              <Box>
                <Input
                  boxSize={["40", "78"]}
                  className="image-file"
                  bgColor="whiteAlpha.400"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFieldValue("image", e.target.files);
                      const image = URL.createObjectURL(e.target.files[0]);
                      setPicture(image);
                    }
                  }}
                  {...rest}
                  id="file"
                  type="file"
                  accept="image/*"
                  mt={2}
                />
                  <Text className="port-text" id="port-text-input">add artwork</Text>
              </Box>
            )}
          </Flex>
          {/* <Text>{pictureName}</Text> */}
        </FormControl>
      </Box>
      <Box mx={["1", "1", "2"]} my={["5", "5", "0"]} width="100%" display="flex" justifyContent="center">
        <InfoForm formField={formField} formProps={formProps} />
      </Box>
    </Flex>
  );
};

export default ImageForm;
