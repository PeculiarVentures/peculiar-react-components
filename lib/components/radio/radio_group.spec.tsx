import * as React from 'react';
import { mount } from 'enzyme';
import { RadioGroup, Radio } from './index';

describe('<RadioGroup />', () => {
  it('expect default render', () => {
    const wrapper = mount(
      <RadioGroup name="default">
        <Radio />
      </RadioGroup>,
    );
    const rootNode = wrapper.find('div').at(0);

    expect(rootNode.exists()).toBe(true);
    expect(rootNode.prop('data-component')).toBe('radio_group');
  });
});
