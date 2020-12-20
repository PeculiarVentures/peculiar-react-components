import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
// @ts-ignore
import Avatar from './index';

describe('<Avatar />', () => {
  it('renders the avatar contents', () => {
    const wrapper = shallow(
      <Avatar />
    );

    expect(wrapper.is('img')).to.be.true;
    expect(wrapper.prop('data-component')).to.equal('avatar');
    expect(wrapper.prop('src')).to.not.empty;
    expect(wrapper.prop('className')).to.equal('avatar round_circle fill_light_grey');
  });

  it('renders the avatar src prop', () => {
    const image = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';
    const wrapper = shallow(
      <Avatar
        src={image}
      />
    );

    expect(wrapper.is('img')).to.be.true;
    expect(wrapper.prop('src')).to.equal(image);
  });

  it('renders the avatar letters prop', () => {
    const text = 'Hello';
    const wrapper = shallow(
      <Avatar
        letters={text}
      />
    );

    expect(wrapper.is('div')).to.be.true;
    expect(wrapper.prop('data-component')).to.equal('avatar');
    expect(wrapper.text()).to.equal(text[0]);
    expect(wrapper.prop('className')).to.equal('avatar round_circle truncate_text fill_light_grey stroke_light_grey text_primary');
  });

  it('renders the avatar empty letters prop', () => {
    const wrapper = shallow(
      <Avatar
        letters=""
      />
    );

    expect(wrapper.is('img')).to.be.true;
    expect(wrapper.prop('src')).to.not.empty;
  });

  it('renders the avatar size prop', () => {
    const wrapper = shallow(
      <Avatar
        size={100}
      />
    );

    expect(wrapper.prop('style')).to.haveOwnProperty('height', 100);
    expect(wrapper.prop('style')).to.haveOwnProperty('width', 100);
  });

  it('renders the avatar className prop', () => {
    const wrapper = shallow(
      <Avatar
        className="test"
      />
    );

    expect(wrapper.prop('className')).to.equal('avatar round_circle fill_light_grey test');
  });

  it('renders the avatar letters className prop', () => {
    const wrapper = shallow(
      <Avatar
        className="test"
        letters="Hello"
      />
    );

    expect(wrapper.prop('className')).to.equal('avatar round_circle truncate_text fill_light_grey stroke_light_grey text_primary test');
  });

  it('renders the avatar theme props', () => {
    const wrapper = shallow(
      <Avatar
        letters="Hello"
        bgType="stroke"
        color="secondary"
        textColor="black"
      />,
    );

    expect(wrapper.prop('className')).to.equal('avatar round_circle truncate_text stroke_secondary text_black');
  });
});
