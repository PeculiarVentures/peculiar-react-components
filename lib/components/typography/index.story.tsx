import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import { Typography } from './index';

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

const align = {
  left: 'left',
  center: 'center',
  right: 'right',
  auto: 'auto',
};

const type = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  b1: 'b1',
  b2: 'b2',
  b3: 'b3',
  c1: 'c1',
};

const props: any = {
  regular: () => ({
    type: select('Type (type)', type, 'h1'),
    color: select('Color (color)', color, 'black'),
    align: select('Align (align)', align, 'left'),
    children: text('Children (children)', 'Typography text'),
  }),
};

storiesOf('Typography', module)
  .add('default', () => {
    const regularProps = props.regular();

    return (
      <div style={{ width: '50vw' }}>
        <Typography {...regularProps} />
      </div>
    );
  });
