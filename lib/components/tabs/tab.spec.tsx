import * as React from 'react';
import { mount } from 'enzyme';
import { Tab } from './index';

describe('<Tab />', () => {
  it('expect default render', () => {
    const wrapper = mount(
      <Tab value="js">
        Java Script
      </Tab>,
    );
    const rootNode = wrapper.find('button');

    expect(rootNode.exists()).toBe(true);
    expect(rootNode.prop('data-component')).toBe('tab');
  });
});
