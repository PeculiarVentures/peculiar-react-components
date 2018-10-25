import React, { Component } from 'react';
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

export default class Usage extends Component {
  state = {
    value: 'earth',
  };

  render() {
    const { value } = this.state;

    return (
      <Select
        placeholder="Planet name"
        style={{
          maxWidth: 300,
        }}
        value={value}
        onChange={(e, val) => this.setState({ value: val })}
        placement="top"
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
    );
  }
}
