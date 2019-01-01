import * as React from 'react';
import { mount } from 'enzyme';
import { CircularProgress } from './index';

describe('<CircularProgress />', () => {
  it('render without errors', () => {
    const wrapper = mount(
      <CircularProgress />,
    );
    const divNode = wrapper.find('div');

    expect(divNode.prop('data-component')).toBe('circular_progress');
    expect(divNode.exists()).toBe(true);
  });
});
