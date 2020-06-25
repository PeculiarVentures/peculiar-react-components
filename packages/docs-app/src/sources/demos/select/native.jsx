import React from 'react';
import { Select } from 'lib-react-components';

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
    <div>
      <Select
        style={{
          maxWidth: 300,
          marginBottom: 10,
        }}
        native
      >
        {options.map(opt => (
          <option
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </Select>
      <Select
        style={{
          maxWidth: 300,
        }}
        defaultValue="earth"
        native
      >
        {options.map(opt => (
          <option
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </Select>
    </div>
  );
}

