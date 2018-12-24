import * as React from 'react';
import { mount } from 'enzyme';
import { Button } from './index';

describe('<Button />', () => {
  it('render without errors', () => {
    const wrapper = mount(
      <Button>
        Hello
      </Button>,
    );

    expect(wrapper.find('button').exists()).toBe(true);
  });
});
