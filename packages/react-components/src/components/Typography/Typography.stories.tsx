import * as React from 'react';
import { select, boolean, text } from '@storybook/addon-knobs';
import Typography from './index';
import { ITypographyProps } from './Typography';

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

const align: Record<ITypographyProps['align'], ITypographyProps['align']> = {
  left: 'left',
  center: 'center',
  right: 'right',
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
  align: select('align', align, Typography.defaultProps.align),
  ellipsis: boolean('ellipsis', false),
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
