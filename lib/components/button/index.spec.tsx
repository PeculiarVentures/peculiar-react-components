import * as React from 'react';
import { mount } from 'enzyme';
import { Button } from './index';

describe('<Button />', () => {
  it('expect render', () => {
    const wrapper = mount(
      <Button>
        Button
      </Button>,
    );
    const rootNode = wrapper.find('button');

    expect(rootNode.exists()).toBe(true);
    expect(rootNode.prop('data-component')).toBe('button');
    expect(rootNode.children().html()).toBe('<span>Button</span>');
  });

  it('expect basic button attributes', () => {
    const wrapper = mount(
      <Button>
        Button
      </Button>,
    );
    const rootNode = wrapper.find('button');

    expect(rootNode.prop('disabled')).toBe(undefined);
    // tslint:disable-next-line
    expect(rootNode.prop('className')).toBe('button round_small truncate_text button_medium text_center text_white stroke_primary fill_primary');
  });

  it('expect change class name for new theme props', () => {
    const wrapper = mount(
      <Button
        bgType="stroke"
        color="secondary"
        textColor="black"
        size="medium"
      >
        Button
      </Button>,
    );

    // tslint:disable-next-line
    expect(wrapper.find('button').prop('className')).toBe('button round_small truncate_text button_medium text_center text_black stroke_secondary fill_secondary');
  });

  it('expect render link', () => {
    const wrapper = mount(
      <Button
        href="/"
      >
        Button
      </Button>,
    );

    expect(wrapper.find('a').prop('href')).toBe('/');
  });

  it('expect render disabled button', () => {
    const wrapper = mount(
      <Button
        href="/"
        disabled={true}
      >
        Button
      </Button>,
    );
    const rootNode = wrapper.find('button');

    expect(rootNode.prop('href')).toBe(undefined);
    expect(rootNode.prop('disabled')).toBe(true);
  });

  it('expect show className from props', () => {
    const wrapper = mount(
      <Button
        className="custom"
      >
        Button
      </Button>,
    );

    // tslint:disable-next-line
    expect(wrapper.find('button').prop('className')).toBe('button round_small truncate_text button_medium text_center text_white stroke_primary fill_primary custom');
  });

  it('expect call onClick action', () => {
    const click = jest.fn();
    const wrapper = mount(
      <Button
        onClick={click}
      >
        Button
      </Button>,
    );

    wrapper.find('button').simulate('click');
    wrapper.update();

    expect(click).toBeCalled();
  });

  it('expect not call onClick action', () => {
    const click = jest.fn();
    const wrapper = mount(
      <Button
        onClick={click}
        disabled={true}
      >
        Button
      </Button>,
    );

    wrapper.find('button').simulate('click');
    wrapper.update();

    expect(click).not.toBeCalled();
  });
});
