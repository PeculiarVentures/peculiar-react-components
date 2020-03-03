import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';

import Button from './index';
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

const props = {
  default: () => ({
    bgType: select('bgType', bgType, Button.defaultProps.bgType),
    color: select('color', color, Button.defaultProps.color),
    colorText: select('colorText', color, Button.defaultProps.colorText),
    size: select<IButtonProps['size']>('size', size, Button.defaultProps.size),
    children: text('children', 'I am Button'),
    disabled: boolean('disabled', false),
  }),
};

const DefaultButton = () => {
  const regularProps = props.default();

  return (
    <Button {...regularProps} />
  );
};

storiesOf('Components|Button', module)
  .add('default', DefaultButton);
