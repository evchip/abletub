import { Box, FormControl, Input, Text } from "@chakra-ui/react";
import React, { ReactElement, useState, useContext } from "react";
import * as Yup from "yup";
import { formTypes } from "../../utils/FormModel/postFormModel"


interface Props {
  props: formTypes
}

function ImageForm(props): ReactElement {
  const { formProps } = props
  const { values, setFieldValue } = formProps
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


  return (
   <React.Fragment>
    <Box mt="4">
      <Text>upload image ({"<"} 15 mb)</Text>
      <FormControl>
      <Input
        onChange={(e) => setFieldValue("image", e.target.files)}
        name="image"
        id="file"
        className="image-file"
        type="file"
        accept="image/*"
        mt={2}
      />
      <pre>{JSON.stringify(values, null, 2)}</pre>
      </FormControl>
      <Text>{pictureName}</Text>
    </Box>
    </React.Fragment>
  );
}

export default ImageForm;
