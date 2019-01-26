import * as React from 'react';
import { mount } from 'enzyme';
import { Switch } from './index';

describe('<Switch />', () => {
  it('render without errors', () => {
    const wrapper = mount(
      <Switch />,
    );
    const rootNode = wrapper.find('div').at(0);

    expect(rootNode.exists()).toBe(true);
    expect(rootNode.prop('data-component')).toBe('switch');
  });
});
