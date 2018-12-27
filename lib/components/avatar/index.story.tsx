import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number, text } from '@storybook/addon-knobs';
import { Avatar } from './index';

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

const props: any = {
  regular: () => ({
    bgType: select('Background type (bgType)', bgType, 'fill'),
    color: select('Color (color)', color, 'light_grey'),
    textColor: select('Text color (textColor)', color, 'primary'),
    size: number('Size (size)', 40),
    letters: text('Letters (letters)', ''),
    src: text('Src (src)', ''),
  }),
};

storiesOf('Avatar', module)
  .add('default', () => {
    const regularProps = props.regular();

    return (
      <Avatar {...regularProps} />
    );
  });
