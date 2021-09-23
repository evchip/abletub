import { Box, FormControl, Input, Text, Flex, Heading, FormErrorMessage, Textarea } from "@chakra-ui/react";
import { FieldAttributes, FieldHookConfig, FormikHelpers, FormikProps, useField } from "formik";
import React, { ReactElement, useState } from "react";
import * as Yup from "yup";
import { formTypes } from "../../utils/FormModel/postFormModel";
import { at } from 'lodash'

interface Props {
  formField: formTypes;
  formProps: FormikProps<{[x: string]: string;}> & FormikHelpers<{}> & {name: string};
}

interface ICustomFieldProps {
  label: string;
}

const FileInput: React.FC<FieldHookConfig<string> & ICustomFieldProps> = ({label, value, onChange, ...props}) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <Input {...field} onChange={() => {
      console.log("changed")
    }} value={undefined} type="file"/>
  )
}

const TrackForm: React.FC<Props> = ({formField, formProps}): ReactElement => {
  const { values, setFieldValue, touched, errors, ...rest } = formProps;
  const [title, setTitle] = useState("");
  console.log('formProps', formProps)
  const [field, meta] = useField(formProps)

  const PostSchema = Yup.object().shape({
    audioFileSize: Yup.number()
      .min(1, "please upload a file.")
      .max(50000000, "file is too large. max size is 50 MB.")
      .required("required")
  });


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
          <FileInput name="input-test" type="input" label="labellll"/>
          <Input
            onChange={(e) => {
              if (e.target.files) {
                setFieldValue("audio", e.target.files);
                setTitle(e.target.files[0].name);
              }
            }}
            name="audio"
            id="file"
            className="audio-file"
            type="file"
            accept=".mp3"
            mt={2}
          />
        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
        <pre>{JSON.stringify(errors, null, 2)}</pre>
        </FormControl>
        <Box width="20rem">
        <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          {title}
        </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default TrackForm;
