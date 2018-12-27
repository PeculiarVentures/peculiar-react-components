import * as React from 'react';
import { mount } from 'enzyme';
import { HighlightCode } from './index';

describe('<HighlightCode />', () => {
  it('render without errors', () => {
    const wrapper = mount(
      <HighlightCode>
        Hello
      </HighlightCode>,
    );

    expect(wrapper.find('code').exists()).toBe(true);
  });
});
