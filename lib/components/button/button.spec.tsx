import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { Button, IButtonProps } from './index';

/* tslint:disable:max-line-length */
describe('<Button />', () => {
  let wrapper: ReactWrapper<IButtonProps, {}, Button> | null;
  const defaultProps: Partial<IButtonProps> = {
    onClick: jest.fn(),
  };

  afterEach(() => {
    jest.resetAllMocks();

    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it('expect render', () => {
    wrapper = mount((
      <Button>
        Button
      </Button>
    ));
    const rootNode = wrapper.find('button');

    expect(rootNode.exists())
      .toBe(true);
    expect(rootNode.prop('data-component'))
      .toBe('button');
    expect(rootNode.children().html())
      .toBe('<span>Button</span>');
  });

  it('expect basic button attributes', () => {
    wrapper = mount((
      <Button>
        Button
      </Button>
    ));
    const rootNode = wrapper.find('button');

    expect(rootNode.prop('disabled'))
      .toBe(undefined);
    expect(rootNode.prop('className'))
      .toBe('button round_small truncate_text button_medium text_center text_white stroke_primary fill_primary');
  });

  it('expect change class name for new theme props', () => {
    wrapper = mount((
      <Button
        bgType="stroke"
        color="secondary"
        textColor="black"
        size="medium"
      >
        Button
      </Button>
    ));

    expect(wrapper.find('button').prop('className'))
      .toBe('button round_small truncate_text button_medium text_center text_black stroke_secondary');
  });

  it('expect render link', () => {
    wrapper = mount((
      <Button
        href="/"
      >
        Button
      </Button>
    ));

    expect(wrapper.find('a').prop('href'))
      .toBe('/');
  });

  it('expect render disabled button', () => {
    wrapper = mount((
      <Button
        href="/"
        disabled={true}
      >
        Button
      </Button>
    ));
    const rootNode = wrapper.find('button');

    expect(rootNode.prop('href'))
      .toBe(undefined);
    expect(rootNode.prop('disabled'))
      .toBe(true);
  });

  it('expect show className from props', () => {
    wrapper = mount((
      <Button
        className="custom"
      >
        Button
      </Button>
    ));

    expect(wrapper.find('button').prop('className'))
      .toBe('button round_small truncate_text button_medium text_center text_white stroke_primary fill_primary custom');
  });

  it('expect call onClick action', () => {
    wrapper = mount((
      <Button
        {...defaultProps}
      >
        Button
      </Button>
    ));

    wrapper.find('button').simulate('click');
    wrapper.update();

    expect(defaultProps.onClick)
      .toBeCalled();
  });

  it('expect not call onClick action', () => {
    wrapper = mount((
      <Button
        {...defaultProps}
        disabled={true}
      >
        Button
      </Button>
    ));

    wrapper.find('button').simulate('click');
    wrapper.update();

    expect(defaultProps.onClick)
      .not.toBeCalled();
  });
});
