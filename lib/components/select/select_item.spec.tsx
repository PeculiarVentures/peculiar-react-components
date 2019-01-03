import * as React from 'react';
import { mount } from 'enzyme';
import { SelectItem } from './index';

describe('<SelectItem />', () => {
  it('expect default render', () => {
    const wrapper = mount(
      <SelectItem value="1">
        Hello
      </SelectItem>,
    );
    const rootNode = wrapper.find('div');

    expect(rootNode.prop('data-component')).toBe('select_item');
    expect(rootNode.exists()).toBe(true);
  });
});
