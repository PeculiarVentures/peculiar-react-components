import * as React from 'react';
import { mount } from 'enzyme';
import { SelectDropdown, SelectItem } from './index';

describe('<SelectDropdown />', () => {
  it('expect default render', () => {
    const wrapper = mount(
      <SelectDropdown>
        <SelectItem value="1">
          Hello
        </SelectItem>
      </SelectDropdown>,
    );
    const rootNode = wrapper.find('div').at(0);

    expect(rootNode.exists()).toBe(true);
    expect(rootNode.prop('data-component')).toBe('select_dropdown');
  });
});
