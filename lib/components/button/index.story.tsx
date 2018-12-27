import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { Button } from './index';

const bgType = {
  fill: 'fill',
  stroke: 'stroke',
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

const size = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

const props: any = {
  regular: () => ({
    bgType: select('Background type (bgType)', bgType, 'fill'),
    color: select('Color (color)', color, 'primary'),
    textColor: select('Text color (textColor)', color, 'white'),
    size: select('Size (size)', size, 'medium'),
    disabled: boolean('Disabled (disabled)', false),
    children: text('Children (children)', 'Button'),
  }),
};

storiesOf('Button', module)
  .add('default', () => {
    const regularProps = props.regular();

    return (
      <Button {...regularProps} />
    );
  });
