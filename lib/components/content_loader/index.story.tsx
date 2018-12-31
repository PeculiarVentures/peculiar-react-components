import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number } from '@storybook/addon-knobs';
import { ContentLoader } from './index';

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
    color: select('Color (color)', color, 'grey'),
    width: number('Width (width)', 500),
    height: number('Height (height)', 70),
  }),
};

storiesOf('ContentLoader', module)
  .add('default', () => {
    const regularProps = props.regular();

    return (
      <ContentLoader
        {...regularProps}
        style={{ width: '100%' }}
      >
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
      </ContentLoader>
    );
  });
