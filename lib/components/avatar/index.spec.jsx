import React from 'react';
import { mount } from 'enzyme';
import Avatar from './index';

describe('<Avatar />', () => {
  it('render without errors', () => {
    const wrapper = mount(<Avatar />, global.defaultComponentOptions);

    expect(wrapper.find('div').exists()).toBe(true);
  });
});
