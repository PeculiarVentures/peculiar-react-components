import * as React from 'react';
import { mount } from 'enzyme';
import { CircularProgress } from './index';

describe('<CircularProgress />', () => {
  it('render without errors', () => {
    const wrapper = mount(
      <CircularProgress />,
    );
    const rootNode = wrapper.find('div');

    expect(rootNode.exists()).toBe(true);
    expect(rootNode.prop('data-component')).toBe('circular_progress');
  });
});
