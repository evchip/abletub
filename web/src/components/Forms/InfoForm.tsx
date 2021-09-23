import React from "react";
import { Text, Flex, Box, Heading } from "@chakra-ui/react";
import { InputField as Field } from "../InputField";
import InputField from "../FormFields/InputField";
import SelectField from "../FormFields/SelectField";

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

export default function InfoForm(props) {
  const {
    formField: { trackName, trackDescription, genre },
  } = props;
  return (
    <Flex width="100%" direction="column" mx={0}>
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
    </Flex>
  );
}
