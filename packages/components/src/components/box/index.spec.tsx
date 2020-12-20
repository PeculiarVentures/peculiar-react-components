import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
// @ts-ignore
import Box from './index';

describe('<Box />', () => {
  it('renders the box contents', () => {
    const wrapper = shallow(
      <Box />
    );

    expect(wrapper.is('div')).to.be.true;
    expect(wrapper.children().length).to.equal(0);
  });

  it('renders the box children prop like a text', () => {
    const wrapper = shallow(
      <Box>
        Hello
      </Box>
    );

    expect(wrapper.text()).to.equal('Hello');
  });

  it('renders the box children prop like a node', () => {
    const wrapper = shallow(
      <Box>
        <p>
          Hello
        </p>
      </Box>
    );

    expect(wrapper.children().html()).to.equal('<p>Hello</p>');
  });

  it('renders the box tagType prop', () => {
    const wrapper = shallow(
      <Box
        tagType="section"
      />
    );

    expect(wrapper.is('section')).to.be.true;
  });

  it('renders the box fill prop', () => {
    const wrapper = shallow(
      <Box
        fill="black"
      />
    );

    expect(wrapper.prop('style')).to.haveOwnProperty('backgroundColor', 'rgba(var(--black), 1)');
  });

  it('renders the box fill prop with opacity', () => {
    const wrapper = shallow(
      <Box
        fill="black"
        fillOpacity={0.5}
      />
    );

    expect(wrapper.prop('style')).to.haveOwnProperty('backgroundColor', 'rgba(var(--black), 0.5)');
  });

  it('renders the box stroke prop', () => {
    const wrapper = shallow(
      <Box
        stroke="black"
      />
    );

    expect(wrapper.prop('style')).to.haveOwnProperty('borderColor', 'rgba(var(--black), 1)');
  });

  it('renders the box stroke prop with opacity', () => {
    const wrapper = shallow(
      <Box
        stroke="black"
        strokeOpacity={0.5}
      />
    );

    expect(wrapper.prop('style')).to.haveOwnProperty('borderColor', 'rgba(var(--black), 0.5)');
  });

  it('renders the box stroke style prop', () => {
    const wrapper = shallow(
      <Box
        stroke="black"
        strokeStyle="dashed"
      />
    );

    expect(wrapper.prop('style')).to.haveOwnProperty('borderStyle', 'dashed');
  });

  it('renders the box stroke width prop', () => {
    const wrapper = shallow(
      <Box
        stroke="black"
        strokeWidth={10}
      />
    );

    expect(wrapper.prop('style')).to.haveOwnProperty('borderWidth', 10);
  });

  it('renders the box stroke radius prop', () => {
    const wrapper = shallow(
      <Box
        borderRadius={2}
      />
    );

    expect(wrapper.prop('style')).to.haveOwnProperty('borderRadius', '2px');
  });
});
