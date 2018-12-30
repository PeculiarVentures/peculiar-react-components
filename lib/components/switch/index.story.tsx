import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { Switch } from './index';

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

const labelPosition = {
  left: 'left',
  right: 'right',
};

const props: any = {
  regular: () => ({
    bgType: select('Background type (bgType)', bgType, 'fill'),
    color: select('Color (color)', color, 'light_grey'),
    colorOn: select('Color checked (colorOn)', color, 'primary'),
    iconColor: select('Icon color (iconColor)', color, 'grey'),
    iconColorOn: select('Icon color checked (iconColorOn)', color, 'white'),
    disabled: boolean('Disabled (disabled)', false),
    label: text('Label (label)', ''),
    labelPosition: select('Label position (labelPosition)', labelPosition, 'left'),
    labelProps: {
      color: select('Label color (labelProps -> color)', color, 'black'),
    },
  }),
};

storiesOf('Switch', module)
  .add('default', () => {
    const regularProps = props.regular();

    return (
      <Switch {...regularProps} />
    );
  });
