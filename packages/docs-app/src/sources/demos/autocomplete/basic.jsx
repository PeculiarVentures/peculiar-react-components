import React from 'react';
import { Autocomplete } from 'lib-react-components';

const options = [
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
];

export default function Usage() {
  return (
    <React.Fragment>
      <Autocomplete
        placeholder="Planet"
        options={options}
      />
    </React.Fragment>
  );
}
