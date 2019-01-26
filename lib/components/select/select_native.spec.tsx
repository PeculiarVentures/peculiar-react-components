import * as React from 'react';
import { mount } from 'enzyme';
import { SelectNative } from './index';

describe('<SelectNative />', () => {
  it('expect default render', () => {
    const wrapper = mount(
      <SelectNative>
        <option value="1">
          Hello
        </option>
      </SelectNative>,
    );
    const rootNode = wrapper.find('div').at(0);

    expect(rootNode.exists()).toBe(true);
    expect(rootNode.prop('data-component')).toBe('select');
  });
});
