import * as React from 'react';
import { select, boolean, text } from '@storybook/addon-knobs';
import Typography from './index';
import { EColor, EAlign } from '../../common/props';

const color = Object.keys(EColor);
const align = [
  '',
  ...Object.keys(EAlign),
] as (keyof typeof EAlign)[];
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
  type: select('type', types, Typography.defaultProps.type),
  color: select('color', color, Typography.defaultProps.color),
  align: select('align', align, Typography.defaultProps.align),
  ellipsis: boolean('ellipsis', false),
  children: text('children', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
});

export const Default = () => {
  const props = baseProps();

  return (
    <Typography {...props} />
  );
};

export default {
  title: 'Typography',
};
