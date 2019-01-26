import * as React from 'react';
import { mount } from 'enzyme';
import { Tabs, Tab } from './index';

describe('<Tabs />', () => {
  it('expect default render', () => {
    const wrapper = mount(
      <Tabs defaultValue="js">
        <Tab value="js">
          Java Script
        </Tab>
        <Tab value="css">
          CSS
        </Tab>
        <Tab value="html" disabled={true}>
          HTML
        </Tab>
      </Tabs>,
    );
    const rootNode = wrapper.find('div');

    expect(rootNode.exists()).toBe(true);
    expect(rootNode.prop('data-component')).toBe('tabs');
  });
});
