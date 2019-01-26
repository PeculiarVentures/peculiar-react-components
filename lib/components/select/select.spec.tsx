import * as React from 'react';
import { mount } from 'enzyme';
import { SelectItem, Select } from './index';

describe('<Select />', () => {
  it('expect default render', () => {
    const wrapper = mount(
      <Select>
        <SelectItem value="1">
          Hello
        </SelectItem>
      </Select>,
    );
    const rootNode = wrapper.find('div').at(0);

    expect(rootNode.exists()).toBe(true);
    expect(rootNode.prop('data-component')).toBe('select');
  });
});
