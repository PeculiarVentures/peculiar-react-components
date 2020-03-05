import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

addParameters({
  options: {
    theme: {
      base: 'light',
      brandTitle: 'PV react components',
      brandUrl: 'https://github.com/PeculiarVentures/react-components',
    } as any,
  },
  info: {},
});

addDecorator(withKnobs);
addDecorator(withInfo);

configure(
  [
    require.context('../src/components', true, /\.stories\.tsx$/),
  ],
  module
);
