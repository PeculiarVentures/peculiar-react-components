import React from 'react';
import assert from 'assert';
import { shallowWithContext } from '../../utils/with_context';
import { ContentLoader } from '../../../';

describe('<Button />', () => {
  it('render component', () => {
    const wrapper = shallowWithContext(
      <ContentLoader
        width={500}
        height={70}
      >
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
      </ContentLoader>,
    );

    assert.equal(
      wrapper.prop('className'),
      'content_loader',
    );
    assert.equal(
      wrapper.prop('viewBox'),
      '0 0 500 70',
    );
    assert.equal(
      wrapper.find('stop').at(0).prop('className'),
      'content_loader_color_grey',
    );
    assert.equal(
      wrapper.find('stop').at(1).prop('className'),
      'content_loader_color_grey_flow',
    );
    assert.equal(
      wrapper.find('stop').at(2).prop('className'),
      'content_loader_color_grey',
    );
    assert.equal(
      wrapper.prop('data-component'),
      'content-loader',
    );
  });

  it('change theme', () => {
    const wrapper = shallowWithContext(
      <ContentLoader
        width={500}
        height={70}
        color="primary"
      >
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
      </ContentLoader>,
    );

    assert.equal(
      wrapper.find('stop').at(0).prop('className'),
      'content_loader_color_primary',
    );
    assert.equal(
      wrapper.find('stop').at(1).prop('className'),
      'content_loader_color_primary_flow',
    );
    assert.equal(
      wrapper.find('stop').at(2).prop('className'),
      'content_loader_color_primary',
    );
  });

  it('with children', () => {
    const wrapper = shallowWithContext(
      <ContentLoader
        width={500}
        height={70}
      >
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
      </ContentLoader>,
    );

    assert.equal(
      wrapper.contains(<rect x="0" y="0" rx="5" ry="5" width="70" height="70" />),
      true,
    );
  });

  it('with className', () => {
    const wrapper = shallowWithContext(
      <ContentLoader
        width={500}
        height={70}
        className="my-className"
      >
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
      </ContentLoader>,
    );

    assert.equal(
      wrapper.prop('className'),
      'content_loader my-className',
    );
  });

  it('other props', () => {
    const wrapper = shallowWithContext(
      <ContentLoader
        width={500}
        height={70}
        id="my-id"
      >
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
      </ContentLoader>,
    );

    assert.equal(
      wrapper.prop('id'),
      'my-id',
    );
  });
});
