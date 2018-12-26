import * as React from 'react';
import { mount } from 'enzyme';
import { Typography } from './index';

describe('<Typography />', () => {
  it('render without errors', () => {
    const wrapper = mount(
      <Typography>
        Hello
      </Typography>,
    );

    expect(wrapper.find('p').exists()).toBe(true);
  });
});
