import React from 'react';
import { Autocomplete } from 'lib-react-components';

const options = [
  {
    label: 'Mercury',
  },
  {
    label: 'Venus',
  },
  {
    label: 'Earth',
  },
  {
    label: 'Mars',
  },
  {
    label: 'Jupiter',
  },
  {
    label: 'Saturn',
  },
  {
    label: 'Uranus',
  },
  {
    label: 'Neptune',
  },
];

export default function Usage() {
  return (
    <Autocomplete
      placeholder="Planet"
      options={options}
      getOptionLabel={option => option.label}
    />
  );
}
