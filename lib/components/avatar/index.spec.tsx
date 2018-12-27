import * as React from 'react';
import { mount } from 'enzyme';
import { Avatar } from './index';

describe('<Avatar />', () => {
  it('render without errors', () => {
    const wrapper = mount(
      <Avatar />,
    );

    expect(wrapper.find('img').exists()).toBe(true);
  });
});
