import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number } from '@storybook/addon-knobs';
import { CircularProgress } from './index';

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
    color: select('Color (color)', color, 'light_grey'),
    colorProgress: select('Color progress (colorProgress)', color, 'primary'),
    size: number('Size (size)', 24),
    thickness: number('Thickness (thickness)', 4),
  }),
};

storiesOf('CircularProgress', module)
  .add('default', () => {
    const regularProps = props.regular();

    return (
      <CircularProgress {...regularProps} />
    );
  });
