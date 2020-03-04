import * as React from 'react';
import { select, boolean, text } from '@storybook/addon-knobs';
import Button, { AnchorButton } from './index';
import { IButtonProps } from './AbstractButton';

const bgType: Record<IButtonProps['bgType'], IButtonProps['bgType']> = {
  fill: 'fill',
  stroke: 'stroke',
  clear: 'clear',
};

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

const size: Record<IButtonProps['size'], IButtonProps['size']> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

const baseProps = () => ({
  bgType: select('bgType', bgType, Button.defaultProps.bgType),
  color: select('color', color, Button.defaultProps.color),
  colorText: select('colorText', color, Button.defaultProps.colorText),
  size: select<IButtonProps['size']>('size', size, Button.defaultProps.size),
  children: text('children', 'I am Button'),
  disabled: boolean('disabled', false),
  rounded: boolean('rounded', false),
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
