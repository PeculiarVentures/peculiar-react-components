import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
// @ts-ignore
import AnalyticsProvider from '../../containers/analytics_provider';
import SwitchWithAnalytics, { Switch } from './index';

describe('<Switch />', () => {
  it('renders the switch contents', () => {
    const wrapper = shallow(
      <Switch />
    );
    const input = wrapper.find('input');

    expect(input.prop('disabled')).to.be.false;
    expect(input.prop('type')).to.equal('checkbox');
    expect(input.prop('checked')).to.be.false;
    expect(wrapper.prop('data-component')).to.equal('switch');
    expect(wrapper.prop('className')).to.equal('switch');
  });

  it('renders the switch name prop', () => {
    const wrapper = shallow(
      <Switch
        name="test"
      />
    );

    expect(wrapper.find('input').prop('name')).to.be.equal('test');
  });

  it('renders the switch disabled prop', () => {
    const wrapper = shallow(
      <Switch
        disabled={true}
      />
    );

    expect(wrapper.find('input').prop('disabled')).to.be.true;
  });

  it('renders the switch defaultChecked prop', () => {
    const wrapper = shallow(
      <Switch
        defaultChecked={true}
      />
    );

    expect(wrapper.find('input').prop('checked')).to.be.true;
  });

  it('renders the switch checked prop', () => {
    const wrapper = shallow(
      <Switch
        checked={false}
      />
    );

    expect(wrapper.find('input').prop('checked')).to.be.false;

    wrapper.setProps({
      checked: true,
    });

    expect(wrapper.find('input').prop('checked')).to.be.true;
  });

  it('renders the switch className prop', () => {
    const wrapper = shallow(
      <Switch
        className="test"
      />
    );

    expect(wrapper.prop('className')).to.be.equal('switch test');
  });

  it('clicking on the switch triggers onCheck prop', () => {
    const onCheck = spy();
    const wrapper = shallow(
      <Switch
        onCheck={onCheck}
      />
    );

    wrapper.find('input').simulate('change');

    expect(onCheck.callCount).to.equal(1);
  });

  it('clicking on the analytics switch triggers onEvent prop', () => {
    const onEvent = spy();
    const wrapper = mount(
      <AnalyticsProvider
        onEvent={onEvent}
      >
        <SwitchWithAnalytics
          gaEventName="test"
        />
      </AnalyticsProvider>
    );

    wrapper.find('input').simulate('change');

    expect(onEvent.callCount).to.equal(1);
    expect(onEvent.args).to.deep.equal([['test']]);
  });
});
