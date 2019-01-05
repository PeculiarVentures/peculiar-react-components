import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number } from '@storybook/addon-knobs';
import { LinearProgress } from './index';

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
    color: select('Color (color)', color, LinearProgress.defaultProps.color),
    colorProgress: select(
      'Color progress (colorProgress)',
      color,
      LinearProgress.defaultProps.colorProgress,
    ),
    value: number('Value (value)', 10),
  }),
};

storiesOf('LinearProgress', module)
  .add('default', () => {
    const regularProps = props.regular();

    return (
      <LinearProgress
        style={{ width: '50vw' }}
        {...regularProps}
      />
    );
  });
