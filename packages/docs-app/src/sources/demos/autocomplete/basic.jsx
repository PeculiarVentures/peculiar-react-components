import React from 'react';
import { SelectItem, Autocomplete } from 'lib-react-components';

const options = [
  {
    label: 'Mercury',
    value: 'mercury',
  },
  {
    label: 'Venus',
    value: 'venus',
  },
  {
    label: 'Earth',
    value: 'earth',
  },
  {
    label: 'Mars',
    value: 'mars',
  },
  {
    label: 'Jupiter',
    value: 'jupiter',
  },
  {
    label: 'Saturn',
    value: 'saturn',
  },
  {
    label: 'Uranus',
    value: 'uranus',
  },
  {
    label: 'Neptune',
    value: 'neptune',
  },
];

export default function Usage() {
  return (
    <Autocomplete
      placeholder="Planet"
    >
      {options.map(opt => (
        <SelectItem
          key={opt.value}
          value={opt.value}
        >
          {opt.label}
        </SelectItem>
      ))}
    </Autocomplete>
  );
}
