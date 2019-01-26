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
    const rootNode = wrapper.find('pre');

    expect(rootNode.exists()).toBe(true);
    expect(rootNode.prop('data-component')).toBe('highlight_code');
  });
});
