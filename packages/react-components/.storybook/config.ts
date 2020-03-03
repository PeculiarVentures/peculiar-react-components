import { configure, addDecorator } from '@storybook/react';
// import { withOptions } from '@storybook/addon-options';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
// import { withKnobs } from '@storybook/addon-knobs';
// import { version } from '../package.json';

// addDecorator(
//   withOptions({
//     name: `@pv/react-components v${version}`,
//     url: 'https://github.com/PeculiarVentures/react-components',
//     showAddonPanel: true,
//     sidebarAnimations: true,
//   })
// );
// addDecorator(
//   withInfo({
//     header: false,
//     inline: false,
//     source: false,
//     styles: {
//       source: {
//         h1: {
//           fontSize: 30,
//         },
//       },
//     },
//   })
// );
// addDecorator(withKnobs());
const req = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
  addDecorator(withKnobs);
  addDecorator(withInfo);

  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
