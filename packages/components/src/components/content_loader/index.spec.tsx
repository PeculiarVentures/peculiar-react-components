import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
// @ts-ignore
import ContentLoader from './index';

describe('<ContentLoader />', () => {
  it('renders the content loader contents', () => {
    const wrapper = shallow(
      <ContentLoader />
    );

    expect(wrapper.is('svg')).to.be.true;
    expect(wrapper.prop('data-component')).to.equal('content-loader');
    expect(wrapper.prop('className')).to.equal('content_loader');
  });

  it('renders the content loader children prop', () => {
    const wrapper = shallow(
      <ContentLoader>
        <circle cx="30" cy="30" r="30" />
      </ContentLoader>
    );

    expect(wrapper.find('clipPath').children().html()).to.equal('<circle cx="30" cy="30" r="30"></circle>');
  });

  it('renders the content loader className prop', () => {
    const wrapper = shallow(
      <ContentLoader
        className="test"
      />
    );

    expect(wrapper.prop('className')).to.equal('content_loader test');
  });

  it('renders the content loader color prop', () => {
    const wrapper = shallow(
      <ContentLoader
        color="black"
      />
    );

    expect(wrapper.find('stop').at(0).prop('className')).to.equal('content_loader_color_black');
    expect(wrapper.find('stop').at(1).prop('className')).to.equal('content_loader_color_black');
    expect(wrapper.find('stop').at(2).prop('className')).to.equal('content_loader_color_black');
  });

  it('renders the content loader size props', () => {
    const wrapper = shallow(
      <ContentLoader
        width={10}
        height={20}
      />
    );

    expect(wrapper.prop('viewBox')).to.equal('0 0 10 20');
    expect(wrapper.find('rect').prop('width')).to.equal(10);
    expect(wrapper.find('rect').prop('height')).to.equal(20);
  });
});
