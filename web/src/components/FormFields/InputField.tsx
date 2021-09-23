import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import { Input, Text, FormControl } from "@chakra-ui/react";

export default function InputField(props) {
  const { errorText, label, size, ...rest } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }

  return (
    <FormControl>
      <Input
        bg="black"
        borderColor="pink"
        borderWidth="1px"
        borderRadius=".25rem"
        height="2rem"
        width="12rem"
        color="white"
        variant="filled"
        placeholder={label}
        my={2}
        type="text"
        error={meta.touched && meta.error && true}
        helperText={_renderHelperText()}
        {...field}
        {...rest}
      />
    </FormControl>
  );
}
