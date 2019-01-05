import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { select, text, boolean } from '@storybook/addon-knobs';
import { SelectItem, Select } from './index';

// const color = {
//   primary: 'primary',
//   secondary: 'secondary',
//   black: 'black',
//   grey: 'grey',
//   success: 'success',
//   wrong: 'wrong',
//   white: 'white',
//   light_grey: 'light_grey',
// };

// const size = {
//   medium: 'medium',
//   large: 'large',
// };

// const props: any = {
//   regular: () => ({
//     color: select('Color (color)', color, SelectItem.defaultProps.color),
//     colorFocus: select('Color focus (colorFocus)', color, SelectItem.defaultProps.colorFocus),
//     selected: boolean('Selected (selected)', false),
//     disabled: boolean('Disabled (disabled)', false),
//     hasFocus: boolean('Has focus (hasFocus)', false),
//     size: select('Size (size)', size, SelectItem.defaultProps.size),
//     children: text('Children (children)', 'Select item text'),
//   }),
// };
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

storiesOf('Select', module)
  .add('default', () => {
    // const regularProps = props.regular();

    return (
      <Select
        style={{ width: 300 }}
        placeholder="Planet name"
      >
        {options.map(opt => ( // tslint:disable-line
          <SelectItem
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </SelectItem>
        ))}
      </Select>
    );
  });
