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
    color: select('Color (color)', color, CircularProgress.defaultProps.color),
    colorProgress: select(
      'Color progress (colorProgress)',
      color,
      CircularProgress.defaultProps.colorProgress,
    ),
    size: number('Size (size)', CircularProgress.defaultProps.size),
    thickness: number('Thickness (thickness)', CircularProgress.defaultProps.thickness),
  }),
};

storiesOf('CircularProgress', module)
  .add('default', () => {
    const regularProps = props.regular();

    return (
      <CircularProgress {...regularProps} />
    );
  });
