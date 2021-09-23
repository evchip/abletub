import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { at } from 'lodash'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
  size?: string;
  errorText?: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  const { errorText, ...rest } = props;

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }
  const [field, meta] = useField(props);

  return (
    <FormControl >
      {/* {isInvalid={!!error}} */}
      {/* <FormLabel htmlFor={field.name}>{label}</FormLabel> */}
      {textarea ? (
        <Textarea
          {...field}
          placeholder={props.placeholder}
          id={field.name}
          border="1px"
          borderColor="pink"
          bgColor="black"
          width="100%"
          height="8rem"
        />
      ) : (
        <Input
          {...field}
          {...props}
          id={field.name}
          border="1px"
          borderColor="pink"
          bgColor="black"
          width="100%"
          helperText={_renderHelperText()}
        />
      )}

      {/* {error ? <FormErrorMessage>{error}</FormErrorMessage> : null} */}
    </FormControl>
  );
};
