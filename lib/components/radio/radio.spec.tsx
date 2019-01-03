import * as React from 'react';
import { mount } from 'enzyme';
import { Radio } from './index';

describe('<Radio />', () => {
  it('expect default render', () => {
    const wrapper = mount(
      <Radio />,
    );
    const rootNode = wrapper.find('div').at(0);

    expect(rootNode.prop('data-component')).toBe('radio');
    expect(rootNode.exists()).toBe(true);
  });
});
