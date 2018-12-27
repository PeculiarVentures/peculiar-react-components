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
    const preNode = wrapper.find('pre');

    expect(preNode.prop('data-component')).toBe('highlight_code');
    expect(preNode.exists()).toBe(true);
  });
});
