import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
// @ts-ignore
import Typography from './index';

describe('<Typography />', () => {
  it('renders the typography contents', () => {
    const wrapper = shallow(
      <Typography />
    );

    expect(wrapper.is('p')).to.be.true;
    expect(wrapper.text()).to.equal('');
    expect(wrapper.prop('data-component')).to.equal('typography');
    expect(wrapper.prop('className')).to.equal('break_word text_black text_left b1');
  });

  it('renders the typography children prop like a text', () => {
    const wrapper = shallow(
      <Typography>
        Hello
      </Typography>
    );

    expect(wrapper.text()).to.equal('Hello');
  });

  it('renders the typography children prop like a node', () => {
    const wrapper = shallow(
      <Typography>
        <span>
          Hello
        </span>
      </Typography>
    );

    expect(wrapper.children().html()).to.equal('<span>Hello</span>');
  });

  it('renders the typography className prop', () => {
    const wrapper = shallow(
      <Typography
        className="test"
      />
    );

    expect(wrapper.prop('className')).to.equal('break_word text_black text_left test b1');
  });

  const typesTagsH = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ];
  const typesTagsP = [
    'b1',
    'b2',
    'b3',
    'c1',
  ];

  for (const type of typesTagsH) {
    it(`renders the typography "${type}" prop`, () => {
      const wrapper = shallow(
        <Typography
          type={type}
        />
      );

      expect(wrapper.is(type)).to.be.true;
    });
  }

  for (const type of typesTagsP) {
    it(`renders the typography "${type}" prop`, () => {
      const wrapper = shallow(
        <Typography
          type={type}
        />
      );

      expect(wrapper.is('p')).to.be.true;
    });
  }

  it('renders the typography theme props', () => {
    const wrapper = shallow(
      <Typography
        color="wrong"
        align="center"
      />
    );

    expect(wrapper.prop('className')).to.equal('break_word text_wrong text_center b1');
  });

  it('renders the typography device props', () => {
    const wrapper = shallow(
      <Typography
        tabletType="h1"
        mobileType="c1"
      />
    );

    expect(wrapper.prop('data-classnamedesktop')).to.equal('break_word text_black text_left');
    expect(wrapper.prop('data-classnametablet')).to.equal('break_word text_black text_left h1');
    expect(wrapper.prop('data-classnamemobile')).to.equal('break_word text_black text_left c1');
  });
});
