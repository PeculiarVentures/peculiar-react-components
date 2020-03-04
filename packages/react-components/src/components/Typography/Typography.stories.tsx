import * as React from 'react';
import { select, text } from '@storybook/addon-knobs';
import Typography from './index';

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

const types = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'b1',
  'b2',
  'b3',
  'c1',
];

const baseProps = () => ({
  color: select('color', color, Typography.defaultProps.color),
  children: text('children', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
});

export const Types = () => {
  const props = baseProps();

  return types.map((type) => (
    <Typography
      key={type}
      type={type}
      {...props}
    />
  ));
};

export default {
  title: 'Typography',
};
