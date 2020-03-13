import * as React from 'react';
import { select, boolean, text } from '@storybook/addon-knobs';
import Button, { AnchorButton } from './index';
import { EShape } from './AbstractButton';
import { EColor, EBgType, ESize } from '../../common/props';

const bgType = [
  ...Object.keys(EBgType),
  'clear',
] as (keyof typeof EBgType)[];
const color = Object.keys(EColor);
const size = [
  '',
  ...Object.keys(ESize),
] as (keyof typeof ESize)[];
const shape = [
  '',
  ...Object.keys(EShape),
] as (keyof typeof EShape)[];

const baseProps = () => ({
  bgType: select('bgType', bgType, Button.defaultProps.bgType),
  color: select('color', color, Button.defaultProps.color),
  colorText: select('colorText', color, Button.defaultProps.colorText),
  size: select('size', size, Button.defaultProps.size),
  shape: select('shape', shape, Button.defaultProps.shape),
  children: text('children', 'I am Button'),
  disabled: boolean('disabled', false),
  fullWidth: boolean('fullWidth', false),
});

export const Default = () => {
  const props = baseProps();

  return (
    <Button {...props} />
  );
};

export const Anchor = () => {
  const props = {
    ...baseProps(),
    href: text('href', '/'),
  };

  return (
    <AnchorButton
      {...props}
    />
  );
};

export default {
  title: 'Button',
};
