import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { version } from '../package.json';

addDecorator(
  withOptions({
    name: `Alternative UI v${version}`,
    url: 'https://github.com/PeculiarVentures/react-components',
    showAddonPanel: true,
    sidebarAnimations: true,
  })
);

addDecorator(
  withInfo({
    header: false,
    inline: false,
    source: false,
    styles: {
      source: {
        h1: {
          fontSize: 30,
        },
      },
    },
  })
);

addDecorator(withKnobs());

function loadStories() {
  const req = require.context('../lib', true, /\.story\.tsx$/);

  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
