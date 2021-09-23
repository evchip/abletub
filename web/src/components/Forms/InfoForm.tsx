import React from "react";
import { Text, Flex, Box, Heading, FormControl, Input } from "@chakra-ui/react";
import { InputField as Field } from "../FormFields/InputField";
import InputField from "../FormFields/InputField";
import SelectField from "../FormFields/SelectField";
import { FormikProps, FormikHelpers, useField } from "formik";
import { formTypes } from "utils/FormModel/postFormModel";

const genres = [
  {
    value: undefined,
    label: "none",
  },
  {
    value: "1",
    label: "electronic",
  },
  {
    value: "2",
    label: "hip hop",
  },
  {
    value: "3",
    label: "rock",
  },
];

interface Props {
  formField: formTypes;
  formProps: FormikProps<{ [x: string]: string }> &
    FormikHelpers<{}> & { name: string };
}

export const InfoForm: React.FC<Props> = ({ formField, formProps }) => {
  const { trackName, trackDescription, genre } = formField;
  const { errors, ...rest } = formProps;

  const [field, meta] = useField(formProps);

  return (
    <Flex width="100%" direction="column" mx={0} justifyContent="center">
      <FormControl isInvalid={meta.touched && !!meta.error}>
        <Box>
          <Field
            name={trackName.name}
            label={trackName.label}
            placeholder="track name"
          />
        </Box>
        <Flex direction="row" justifyContent="space-between">
          <Box width="48%">
            <SelectField name={genre.name} label={genre.label} data={genres} />
          </Box>
          <Box width="48%">
            <SelectField name={genre.name} label={genre.label} data={genres} />
          </Box>
        </Flex>
        <Box>
          <Field
            name={trackDescription.name}
            textarea
            placeholder="description"
            label={trackDescription.label}
          />
        </Box>
      </FormControl>
    </Flex>
  );
};
