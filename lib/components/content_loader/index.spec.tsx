import * as React from 'react';
import { mount } from 'enzyme';
import { ContentLoader } from './index';

describe('<ContentLoader />', () => {
  it('render without errors', () => {
    const wrapper = mount(
      <ContentLoader>
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
      </ContentLoader>,
    );
    const rootNode = wrapper.find('svg');

    expect(rootNode.exists()).toBe(true);
    expect(rootNode.prop('data-component')).toBe('content_loader');
  });
});
