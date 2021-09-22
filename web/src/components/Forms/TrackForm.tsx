import { Box, FormControl, Input, Text } from "@chakra-ui/react";
import React, { ReactElement, useState, useContext } from "react";
import * as Yup from "yup";
import { formTypes } from "../../utils/FormModel/postFormModel";

interface Props {
  formField: formTypes;
}

function TrackForm(props): ReactElement {

  const { formProps } = props
  const { values, setFieldValue } = formProps
  const [title, setTitle] = useState("");

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
        <Text>upload track ({"<"} 50 mb)</Text>
        <FormControl>
          <Input
            onChange={(e) => setFieldValue("audio", e.target.files)}
            name="audio"
            id="file"
            className="audio-file"
            type="file"
            accept=".mp3"
            mt={2}
          />
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </FormControl>
        <Text>{title}</Text>
      </Box>
    </React.Fragment>
  );
}

export default TrackForm;
