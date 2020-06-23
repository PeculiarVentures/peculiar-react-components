import React from 'react';
import { mount } from 'enzyme';
import Typography from './index';

describe('<Typography />', () => {
  it('render without errors', () => {
    const wrapper = mount(<Typography>Lorem</Typography>, global.defaultComponentOptions);

    expect(wrapper.find('p').exists()).toBe(true);
  });

  it('check basic attributes', () => {
    const wrapper = mount(<Typography>Lorem</Typography>, global.defaultComponentOptions);

    expect(wrapper.find('p').text()).toBe('Lorem');
    expect(wrapper.find('p').prop('className')).toBe('break_word text_black text_left b1');
    expect(wrapper.find('[data-component="typography"]').exists()).toBe(true);
  });

  it('pass classname', () => {
    const wrapper = mount(
      <Typography
        className="custom"
      >
        Lorem
      </Typography>,
      global.defaultComponentOptions,
    );

    expect(wrapper.find('p').prop('className')).toBe('break_word text_black text_left custom b1');
  });

  it('pass type', () => {
    const wrapper = mount(
      <Typography
        type="h1"
      >
        Lorem
      </Typography>,
      global.defaultComponentOptions,
    );

    expect(wrapper.find('h1').prop('className')).toBe('break_word text_black text_left h1');
  });

  it('change theme', () => {
    const wrapper = mount(
      <Typography
        align="center"
        color="wrong"
      >
        Lorem
      </Typography>,
      global.defaultComponentOptions,
    );

    expect(wrapper.find('p').prop('className')).toBe('break_word text_wrong text_center b1');
  });

  it('device attributes', () => {
    const wrapper = mount(
      <Typography
        tabletType="h1"
        mobileType="c1"
      >
        Lorem
      </Typography>,
      global.defaultComponentOptions,
    );

    expect(wrapper.find('p').prop('data-classnamedesktop')).toBe('break_word text_black text_left');
    expect(wrapper.find('p').prop('data-classnametablet')).toBe('break_word text_black text_left h1');
    expect(wrapper.find('p').prop('data-classnamemobile')).toBe('break_word text_black text_left c1');
  });
});
