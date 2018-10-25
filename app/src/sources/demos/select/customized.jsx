import React from 'react';
import { Select, SelectItem } from 'lib-react-components';

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
        placeholder="Planet name"
        style={{
          maxWidth: 300,
          marginBottom: 10,
        }}
        bgType="stroke"
        color="black"
        textColor="black"
      >
        {options.map(opt => (
          <SelectItem
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        placeholder="Planet name"
        style={{
          maxWidth: 300,
        }}
        colorFocus="success"
        color="black"
        textColor="white"
      >
        {options.map(opt => (
          <SelectItem
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
