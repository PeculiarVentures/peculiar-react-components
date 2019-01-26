import * as React from 'react';
import { mount } from 'enzyme';
import { LinearProgress } from './index';

describe('<LinearProgress />', () => {
  it('render without errors', () => {
    const wrapper = mount(
      <LinearProgress />,
    );
    const rootNode = wrapper.find('div').at(0);

    expect(rootNode.exists()).toBe(true);
    expect(rootNode.prop('data-component')).toBe('linear_progress');
  });
});
