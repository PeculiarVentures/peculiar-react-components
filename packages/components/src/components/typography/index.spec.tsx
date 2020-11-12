import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
// @ts-ignore
import Typography from './index';

describe('<Typography />', () => {
  it('render without errors', () => {
    const wrapper = mount(<Typography>Lorem</Typography>);

    expect(wrapper.find('p').exists()).to.be.true;
  });

  it('check basic attributes', () => {
    const wrapper = mount(<Typography>Lorem</Typography>);

    expect(wrapper.find('p').text()).to.equal('Lorem');
    expect(wrapper.find('p').prop('className')).to.equal('break_word text_black text_left b1');
    expect(wrapper.find('[data-component="typography"]').exists()).to.be.true;
  });

  it('pass classname', () => {
    const wrapper = mount(
      <Typography
        className="custom"
      >
        Lorem
      </Typography>,
    );

    expect(wrapper.find('p').prop('className')).to.equal('break_word text_black text_left custom b1');
  });

  it('pass type', () => {
    const wrapper = mount(
      <Typography
        type="h1"
      >
        Lorem
      </Typography>,
    );

    expect(wrapper.find('h1').prop('className')).to.equal('break_word text_black text_left h1');
  });

  it('change theme', () => {
    const wrapper = mount(
      <Typography
        align="center"
        color="wrong"
      >
        Lorem
      </Typography>,
    );

    expect(wrapper.find('p').prop('className')).to.equal('break_word text_wrong text_center b1');
  });

  it('device attributes', () => {
    const wrapper = mount(
      <Typography
        tabletType="h1"
        mobileType="c1"
      >
        Lorem
      </Typography>,
    );

    expect(wrapper.find('p').prop('data-classnamedesktop')).to.equal('break_word text_black text_left');
    expect(wrapper.find('p').prop('data-classnametablet')).to.equal('break_word text_black text_left h1');
    expect(wrapper.find('p').prop('data-classnamemobile')).to.equal('break_word text_black text_left c1');
  });
});
