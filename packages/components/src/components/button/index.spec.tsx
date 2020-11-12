import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
// @ts-ignore
import Button from './index';

describe('<Button />', () => {
  it('render without errors', () => {
    const wrapper = mount(<Button>1</Button>);

    expect(wrapper.find('button').exists()).to.be.true;
  });

  it('check basic props', () => {
    const wrapper = mount(<Button>1</Button>);
    const btn = wrapper.find('button');

    expect(btn.prop('disabled')).to.be.false;
    expect(btn.prop('data-component')).to.equal('button');
    expect(btn.prop('className'))
      .to.equal('button round_small truncate_text break_word text_center button_medium button_text_white fill_primary text_white');
  });

  it('change theme', () => {
    const wrapper = mount(
      <Button
        bgType="stroke"
        color="secondary"
        textColor="black"
        size="medium"
      >
        1
      </Button>,
    );

    expect(wrapper.find('button').prop('className'))
      .to.equal('button round_small truncate_text break_word text_center button_medium button_text_black stroke_secondary text_black');
  });

  it('check link', () => {
    const wrapper = mount(
      <Button
        href="/"
      >
        1
      </Button>,
    );

    expect(wrapper.find('a').prop('href')).to.equal('/');
  });

  it('disable button', () => {
    const wrapper = mount(
      <Button
        href="/"
        disabled
      >
        1
      </Button>,
    );

    expect(wrapper.find('button').prop('href')).to.be.null;
    expect(wrapper.find('button').prop('disabled')).to.be.true;
  });

  it('render with children', () => {
    const wrapper = mount(
      <Button>
        <p>1</p>
      </Button>,
    );

    expect(wrapper.find('button').children().html()).to.equal('<span><p>1</p></span>');
  });

  it('with classNames', () => {
    const wrapper = mount(
      <Button
        className="custom"
      >
        1
      </Button>,
    );

    expect(wrapper.find('button').prop('className'))
      .to.equal('button round_small truncate_text break_word text_center button_medium button_text_white fill_primary text_white custom');
  });

  it('handle events', () => {
    const click = spy();
    const wrapper = mount(
      <Button
        onClick={click}
      >
        1
      </Button>,
    );

    wrapper.find('button').simulate('click');
    wrapper.update();

    expect(click.callCount).to.equal(1);
  });

  it('handle events on disabled btn', () => {
    const click = spy();
    const wrapper = mount(
      <Button
        onClick={click}
        disabled
      >
        1
      </Button>,
    );

    wrapper.find('button').simulate('click');
    wrapper.update();

    expect(click.callCount).to.equal(0);
  });
});
