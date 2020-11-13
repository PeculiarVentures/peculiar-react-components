import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
// @ts-ignore
import AnalyticsProvider from '../../containers/analytics_provider';
import ButtonWithAnalytics, { Button } from './index';

describe('<Button />', () => {
  function button(props: any, useMount = false) {
    const element = (
      <Button {...props} />
    );

    return useMount ? mount(element) : shallow(element);
  }

  it('renders the button contents', () => {
    const wrapper = button({});

    expect(wrapper.is('button')).to.be.true;
    expect(wrapper.prop('disabled')).to.be.false;
    expect(wrapper.prop('data-component')).to.equal('button');
    expect(wrapper.prop('className')).to.equal('button round_small truncate_text break_word text_center button_medium button_text_white fill_primary text_white');
  });

  it('renders the button children prop like a text', () => {
    const wrapper = button({
      children: 'test',
    })

    expect(wrapper.text()).to.equal('test');
  });

  it('renders the button children prop like a node', () => {
    const wrapper = button({
      children: (
        <p>
          test
        </p>
      ),
    })

    expect(wrapper.children().html()).to.equal('<span><p>test</p></span>');
  });

  it('renders the button theme props', () => {
    const wrapper = button({
      bgType: 'stroke',
      color: 'secondary',
      textColor: 'black',
      size: 'medium',
    });

    expect(wrapper.prop('className')).to.equal('button round_small truncate_text break_word text_center button_medium button_text_black stroke_secondary text_black');
  });

  it('renders the button component prop', () => {
    const wrapper = button({
      children: 'test',
      component: (props: any) => (
        <div {...props} />
      ),
    });

    expect(wrapper.is('div')).to.be.true;
    expect(wrapper.text()).to.equal('test');
    expect(wrapper.prop('disabled')).to.be.false;
    expect(wrapper.prop('data-component')).to.equal('button');
    expect(wrapper.prop('className')).to.equal('button round_small truncate_text break_word text_center button_medium button_text_white fill_primary text_white');
  });

  it('clicking on the button triggers onClick prop', () => {
    const onClick = spy();

    button({ onClick }).simulate('click');

    expect(onClick.callCount).to.equal(1);
  });

  it('clicking on the disabled button does not triggers onClick prop', () => {
    const onClick = spy();

    button({ disabled: true, onClick }, true).simulate('click');

    expect(onClick.callCount).to.equal(0);
  });

  it('renders the anchor contents', () => {
    const wrapper = button({ href: '/link' });

    expect(wrapper.is('a')).to.be.true;
    expect(wrapper.prop('href')).to.equal('/link');
    expect(wrapper.prop('disabled')).to.be.false;
    expect(wrapper.prop('data-component')).to.equal('button');
    expect(wrapper.prop('className')).to.equal('button round_small truncate_text break_word text_center button_medium button_text_white fill_primary text_white');
  });

  it('renders the disabled anchor should use button', () => {
    const wrapper = button({ disabled: true, href: '/link' });

    expect(wrapper.is('button')).to.be.true;
    expect(wrapper.prop('href')).to.be.null;
  });

  it('clicking on the analytics button triggers onEvent prop', () => {
    const onEvent = spy();
    const wrapper = mount(
      <AnalyticsProvider
        onEvent={onEvent}
      >
        <ButtonWithAnalytics
          gaEventName="test"
        />
      </AnalyticsProvider>
    );

    wrapper.find('button').simulate('click');

    expect(onEvent.callCount).to.equal(1);
    expect(onEvent.args).to.deep.equal([['test']]);
  });
});
