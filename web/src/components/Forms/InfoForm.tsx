import React from 'react';
import { Text, Flex, Box, Heading } from "@chakra-ui/react"

import InputField  from '../FormFields/InputField';
import SelectField from '../FormFields/SelectField';

const genres = [
  {
    value: undefined,
    label: 'None'
  },
  {
    value: '1',
    label: 'electronic'
  },
  {
    value: '2',
    label: 'hip hop'
  },
  {
    value: '3',
    label: 'rock'
  }
];

export default function InfoForm(props) {
  const {
    formField: {
      trackName,
      trackDescription,
      genre
    }
  } = props;
  return (
    <React.Fragment>
      <Heading >
        track info
      </Heading>
      <Box >
        <Box >
          <InputField name={trackName.name} label={trackName.label} fullWidth />
        </Box>
        <Box >
          <InputField name={trackDescription.name} label={trackDescription.label} fullWidth />
        </Box>
        <Box >
          <SelectField
            name={genre.name}
            label={genre.label}
            data={genres}
            fullWidth
          />
        </Box>
      </Box>
    </React.Fragment>
  );
}
