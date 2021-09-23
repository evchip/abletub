import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FormikHelpers, FormikProps, useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { at } from 'lodash'
import { formTypes } from "utils/FormModel/postFormModel";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
  size?: string;
  errorText?: string;
};


export const InputField: React.FC<InputFieldProps> = ({
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
      {textarea ? (
        <Textarea
          {...rest}
          {...field}
          isInvalid={meta.touched && meta.error && true}
          placeholder={props.placeholder}
          id={field.name}
          errorBorderColor="red.300"
          border="1px"
          borderColor="whiteAlpha.400"
          bgColor="black"
          width="100%"
          height="9.5rem"
        />
      ) : (
        <Input
          {...rest}
          {...field}
          isInvalid={meta.touched && meta.error && true}
          id={field.name}
          errorBorderColor="red.300"
          border="1px"
          borderColor="whiteAlpha.400"
          bgColor="black"
          width="100%"
          
        />
      )}
    </FormControl>
  );
};
