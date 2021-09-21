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

const states = [
  {
    value: undefined,
    label: 'None'
  },
  {
    value: '11',
    label: 'Florida'
  },
  {
    value: '22',
    label: 'Michigan'
  },
  {
    value: '33',
    label: 'Texas'
  }
];

const countries = [
  {
    value: null,
    label: 'None'
  },
  {
    value: '111',
    label: 'United States'
  },
  {
    value: '222',
    label: 'Italy'
  },
  {
    value: '333',
    label: 'Vietnam'
  }
];

export default function AddressForm(props) {
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
