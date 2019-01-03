import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { Radio } from './index';

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
    bgType: select('Background type (bgType)', bgType, Radio.defaultProps.bgType),
    color: select('Color (color)', color, Radio.defaultProps.color),
    colorOn: select('Color checked (colorOn)', color, Radio.defaultProps.colorOn),
    iconColor: select('Icon color (iconColor)', color, Radio.defaultProps.iconColor),
    iconColorOn: select('Icon color checked (iconColorOn)', color, Radio.defaultProps.iconColorOn),
    disabled: boolean('Disabled (disabled)', Radio.defaultProps.disabled),
    checked: boolean('Checked (checked)', Radio.defaultProps.checked),
  }),
};

storiesOf('Radio', module)
  .add('default', () => {
    const regularProps = props.regular();

    return (
      <Radio {...regularProps} />
    );
  });
