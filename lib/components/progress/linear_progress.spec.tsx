import * as React from 'react';
import { mount } from 'enzyme';
import { LinearProgress } from './index';

describe('<LinearProgress />', () => {
  it('render without errors', () => {
    const wrapper = mount(
      <LinearProgress />,
    );
    const divNode = wrapper.find('div').at(0);

    expect(divNode.prop('data-component')).toBe('linear_progress');
    expect(divNode.exists()).toBe(true);
  });
});
