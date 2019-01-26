import * as React from 'react';
import { mount } from 'enzyme';
import { Typography } from './index';

describe('<Typography />', () => {
  it('expect default render', () => {
    const wrapper = mount(
      <Typography>
        Hello
      </Typography>,
    );
    const rootNode = wrapper.find('p');

    expect(rootNode.exists()).toBe(true);
    expect(rootNode.prop('data-component')).toBe('typography');
  });
});
