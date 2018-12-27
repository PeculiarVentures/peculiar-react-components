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
    const pNode = wrapper.find('p');

    expect(pNode.prop('data-component')).toBe('typography');
    expect(pNode.exists()).toBe(true);
  });
});
