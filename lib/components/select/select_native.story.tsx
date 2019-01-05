import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { SelectNative } from './index';

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

const props: any = {
  regular: () => ({
    bgType: select('Background type (bgType)', bgType, SelectNative.defaultProps.bgType),
    size: select('Size (size)', size, SelectNative.defaultProps.size),
    color: select('Color (color)', color, SelectNative.defaultProps.color),
    colorFocus: select('Color focus (colorFocus)', color, SelectNative.defaultProps.colorFocus),
    textColor: select('Color text (textColor)', color, SelectNative.defaultProps.textColor),
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

storiesOf('SelectNative', module)
  .add('default', () => {
    const regularProps = props.regular();

    return (
      <SelectNative
        {...regularProps}
        style={{ width: 300 }}
      >
        {options.map(opt => ( // tslint:disable-line
          <option
            key={opt.value}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </SelectNative>
    );
  });
