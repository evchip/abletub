import {
  Box,
  FormControl,
  Input,
  Text,
  Flex,
  Heading,
} from "@chakra-ui/react";
import {
  FormikHelpers,
  FormikProps,
  useField,
} from "formik";
import React, { ReactElement, useState } from "react";
import { formTypes } from "../../utils/FormModel/postFormModel";

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
      mx="auto"
      height="20rem"
      display="flex"
      alignItems="space-evenly"
      justifyContent="center"
      p={5}
      shadow="md"
      borderWidth="1px"
      flexDirection="column"
      bgColor="blackAlpha.400"
      borderBottomRadius="30px"
      borderColor="pink.200"
      borderTop="none"
    >
      <Box display="flex" justifyContent="center">
        <Heading fontSize={["xl", "2xl"]}>upload your track</Heading>
      </Box>
      <Flex direction="column" justifyContent="center" mt={10}>
        <FormControl isInvalid={meta.touched && !!meta.error} style={{display: "flex", flexDirection:"column", alignItems:"center", justifyContent: "center", paddingBottom: "2rem"}}>
          <Text>{"<"} 50 mb mp3</Text>
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
        <Flex justifyContent="center" width={["14rem","30rem"]} mt={2}>
          <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {title}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TrackForm;
