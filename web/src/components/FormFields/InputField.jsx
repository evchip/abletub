import {
  FormControl,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";


export const InputField = ({
  textarea,
  size: _,
  ...props
}) => {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);

  return (
    <FormControl >
      {textarea ? (
        <Textarea
          {...rest}
          {...field}
          isInvalid={meta.touched && meta.error ? true : false}
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
          isInvalid={meta.touched && meta.error ? true : false}
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
