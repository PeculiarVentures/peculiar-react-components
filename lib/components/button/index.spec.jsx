import React from 'react';
import { mount } from 'enzyme';
import Button from './index';

describe('<Button />', () => {
  it('render without errors', () => {
    const wrapper = mount(<Button>1</Button>, global.defaultComponentOptions);

    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('chack basic props', () => {
    const wrapper = mount(<Button>1</Button>, global.defaultComponentOptions);
    const btn = wrapper.find('button');

    expect(btn.prop('disabled')).toBe(false);
    expect(btn.prop('data-component')).toBe('button');
    expect(btn.prop('className'))
      .toBe('button round_small text_center button_medium button_fill_primary button_text_white');
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
      global.defaultComponentOptions,
    );

    expect(wrapper.find('button').prop('className'))
      .toBe('button round_small text_center button_medium button_stroke_secondary button_text_black');
  });

  it('check link', () => {
    const wrapper = mount(
      <Button
        href="/"
      >
        1
      </Button>,
      global.defaultComponentOptions,
    );

    expect(wrapper.find('a').prop('href')).toBe('/');
  });

  it('disable button', () => {
    const wrapper = mount(
      <Button
        href="/"
        disabled
      >
        1
      </Button>,
      global.defaultComponentOptions,
    );

    expect(wrapper.find('button').prop('href')).toBe(null);
    expect(wrapper.find('button').prop('disabled')).toBe(true);
  });

  it('render with children', () => {
    const wrapper = mount(
      <Button>
        <p>1</p>
      </Button>,
      global.defaultComponentOptions,
    );

    expect(wrapper.find('button').children().html()).toBe('<p>1</p>');
  });

  it('with classNames', () => {
    const wrapper = mount(
      <Button
        className="custom"
      >
        1
      </Button>,
      global.defaultComponentOptions,
    );

    expect(wrapper.find('button').prop('className'))
      .toBe('button round_small text_center button_medium button_fill_primary button_text_white custom');
  });

  it('handle events', () => {
    const click = jest.fn();
    const wrapper = mount(
      <Button
        onClick={click}
      >
        1
      </Button>,
      global.defaultComponentOptions,
    );

    wrapper.find('button').simulate('click');
    wrapper.update();

    expect(click).toBeCalled();
  });

  it('handle events on disabled btn', () => {
    const click = jest.fn();
    const wrapper = mount(
      <Button
        onClick={click}
        disabled
      >
        1
      </Button>,
      global.defaultComponentOptions,
    );

    wrapper.find('button').simulate('click');
    wrapper.update();

    expect(click).not.toBeCalled();
  });
});
