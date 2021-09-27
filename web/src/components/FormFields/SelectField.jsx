import React from "react";
import PropTypes from "prop-types";
import { at } from "lodash";
import { useField } from "formik";
import { SelectField, FormControl } from "@chakra-ui/react";


const SelectFieldInput = (props) => {
  const { label, data, ...rest } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;

  return (
    <FormControl {...rest} error={isError}>
      <SelectField
        bg="black"
        borderColor="whiteAlpha.400"
        borderWidth="1px"
        borderRadius=".25rem"
        height="2rem"
        width="100%"
        color="white"
        variant="filled"
        placeholder={props.name}
        my={2}
        pl={2}
        {...field}
        value={selectedValue ? selectedValue : ""}
      >
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </SelectField>
    </FormControl>
  );
}

SelectField.defaultProps = {
  data: [],
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SelectFieldInput;
