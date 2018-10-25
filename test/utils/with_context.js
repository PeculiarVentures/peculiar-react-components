import { shallow, mount } from 'enzyme';
import theme from './theme';

export const shallowWithContext = node => shallow(node, {
  context: {
    theme,
  },
});

export const mountWithContext = node => mount(node, {
  context: {
    theme,
  },
});
