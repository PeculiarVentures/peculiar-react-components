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
    bgType: select('Background type (bgType)', bgType, Switch.defaultProps.bgType),
    color: select('Color (color)', color, Switch.defaultProps.color),
    colorOn: select('Color checked (colorOn)', color, Switch.defaultProps.colorOn),
    iconColor: select('Icon color (iconColor)', color, Switch.defaultProps.iconColor),
    iconColorOn: select('Icon color checked (iconColorOn)', color, Switch.defaultProps.iconColorOn),
    labelPosition: select(
      'Label position (labelPosition)',
      labelPosition,
      Switch.defaultProps.labelPosition,
    ),
    labelProps: {
      color: select('Label color (labelProps -> color)', color, 'black'),
    },
    label: text('Label (label)', ''),
    disabled: boolean('Disabled (disabled)', false),
  }),
};

storiesOf('Switch', module)
  .add('default', () => {
    const regularProps = props.regular();

    return (
      <Switch {...regularProps} />
    );
  });
