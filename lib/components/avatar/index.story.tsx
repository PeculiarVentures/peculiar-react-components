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
    bgType: select('Background type (bgType)', bgType, Avatar.defaultProps.bgType),
    color: select('Color (color)', color, Avatar.defaultProps.color),
    textColor: select('Text color (textColor)', color, Avatar.defaultProps.textColor),
    size: number('Size (size)', Avatar.defaultProps.size),
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
