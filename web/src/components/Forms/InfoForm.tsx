import React from "react";
import { Flex, Box, FormControl } from "@chakra-ui/react";
import { InputField as Field } from "../FormFields/InputField";
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
    label: "drum & bass",
  },
  {
    value: "2",
    label: "electronic",
  },
  {
    value: "3",
    label: "future",
  },
  {
    value: "4",
    label: "hip hop",
  },
  {
    value: "5",
    label: "house",
  },
  {
    value: "6",
    label: "lo-fi",
  },
  {
    value: "7",
    label: "rock",
  },
  {
    value: "8",
    label: "techno",
  },
  {
    value: "9",
    label: "trap",
  },
];

const moods = [
  {
    value: undefined,
    label: "none",
  },
  {
    value: "1",
    label: "chill",
  },
  {
    value: "2",
    label: "hard",
  },
  {
    value: "3",
    label: "romantic",
  },
  {
    value: "4",
    label: "upbeat",
  },
];

interface Props {
  formField: formTypes;
  formProps: FormikProps<{ [x: string]: string }> &
    FormikHelpers<{}> & { name: string };
}

export const InfoForm: React.FC<Props> = ({ formField, formProps }) => {
  const { trackName, trackDescription, genre, mood } = formField;

  const [field, meta] = useField(formProps);

  return (
    <Flex width="100%" direction="column" mx={0} justifyContent="center">
      <FormControl isInvalid={meta.touched && !!meta.error}>
        <Box>
          <Field
            size={""}
            textarea={false}
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
            <SelectField name={mood.name} label={mood.label} data={moods} />
          </Box>
        </Flex>
        <Box>
          <Field
            size={""}
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
