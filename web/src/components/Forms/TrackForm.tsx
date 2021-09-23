import {
  Box,
  FormControl,
  Input,
  Text,
  Flex,
  Heading,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import {
  FieldAttributes,
  FieldHookConfig,
  FormikHelpers,
  FormikProps,
  useField,
} from "formik";
import React, { ReactElement, useState } from "react";
import * as Yup from "yup";
import { formTypes } from "../../utils/FormModel/postFormModel";
import { at } from "lodash";

interface Props {
  formField: formTypes;
  formProps: FormikProps<{ [x: string]: string }> &
    FormikHelpers<{}> & { name: string };
}


const TrackForm: React.FC<Props> = ({ formField, formProps }): ReactElement => {
  const { values, setFieldValue, touched, errors, ...rest } = formProps;
  const { audio } = formField
  const [title, setTitle] = useState("");
  const [field, meta] = useField(formProps);

  return (
    <Flex
      mt={0}
      width="100%"
      height="20rem"
      display="flex"
      alignItems="space-evenly"
      p={10}
      shadow="md"
      borderWidth="1px"
      flexDirection="column"
      bgColor="blackAlpha.400"
      borderBottomRadius="30px"
      borderColor="pink.200"
      borderTop="none"
    >
      <Box display="flex" justifyContent="center">
        <Heading fontSize="2xl">upload your track</Heading>
      </Box>
      <Box mt={10}>
        <Text>{"<"} 50 mb mp3</Text>
        <FormControl isInvalid={meta.touched && !!meta.error}>
          <Input
            onChange={(e) => {
              if (e.target.files) {
                setFieldValue("audio", e.target.files);
                setTitle(e.target.files[0].name);
              }
            }}
            id="file"
            className="audio-file"
            type="file"
            accept=".mp3"
            mt={2}
            {...rest}
          />
          {errors ? (
            <Text mt={1} color="red.200">{errors[audio.name]}</Text>
          ) : null}
        </FormControl>
        <Box width="20rem">
          <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {title}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default TrackForm;
