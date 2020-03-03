import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

addDecorator(withKnobs);
addDecorator(withInfo);

configure(
  [
    require.context('../src', true, /\.stories\.tsx$/),
  ],
  module
);
