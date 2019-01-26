import * as React from 'react';
import { mount } from 'enzyme';
import { Checkbox } from './index';

describe('<Checkbox />', () => {
  it('render without errors', () => {
    const wrapper = mount(
      <Checkbox />,
    );
    const rootNode = wrapper.find('div').at(0);

    expect(rootNode.exists()).toBe(true);
    expect(rootNode.prop('data-component')).toBe('checkbox');
  });
});
