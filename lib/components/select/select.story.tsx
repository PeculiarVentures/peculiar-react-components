import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { SelectItem, Select } from './index';

const color = {
  primary: 'primary',
  secondary: 'secondary',
  black: 'black',
  grey: 'grey',
  success: 'success',
  wrong: 'wrong',
  white: 'white',
  light_grey: 'light_grey',
};

const size = {
  medium: 'medium',
  large: 'large',
};

const bgType = {
  fill: 'fill',
  stroke: 'stroke',
};

const placement = {
  top: 'top',
  bottom: 'bottom',
};

const props: any = {
  regular: () => ({
    bgType: select('Background type (bgType)', bgType, Select.defaultProps.bgType),
    size: select('Size (size)', size, Select.defaultProps.size),
    placement: select('Dropdown placement (placement)', placement, Select.defaultProps.placement),
    color: select('Color (color)', color, Select.defaultProps.color),
    colorFocus: select('Color focus (colorFocus)', color, Select.defaultProps.colorFocus),
    textColor: select('Color text (textColor)', color, Select.defaultProps.textColor),
    placeholder: text('Placeholder (placeholder)', 'Planet name'),
    disabled: boolean('Disabled (disabled)', false),
  }),
};

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
    const regularProps = props.regular();

    return (
      <Select
        {...regularProps}
        style={{ width: 300 }}
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
