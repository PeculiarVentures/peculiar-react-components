import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
// @ts-ignore
import AnalyticsProvider from '../../containers/analytics_provider';
import CheckboxWithAnalytics, { Checkbox } from './index';

describe('<Checkbox />', () => {
  it('renders the checkbox contents', () => {
    const wrapper = shallow(
      <Checkbox />
    );
    const input = wrapper.find('input');

    expect(input.prop('disabled')).to.be.false;
    expect(input.prop('type')).to.equal('checkbox');
    expect(input.prop('checked')).to.be.false;
    expect(wrapper.prop('data-component')).to.equal('checkbox');
    expect(wrapper.prop('className')).to.equal('checkbox');
  });

  it('renders the checkbox name prop', () => {
    const wrapper = shallow(
      <Checkbox
        name="test"
      />
    );

    expect(wrapper.find('input').prop('name')).to.be.equal('test');
  });

  it('renders the checkbox disabled prop', () => {
    const wrapper = shallow(
      <Checkbox
        disabled={true}
      />
    );

    expect(wrapper.find('input').prop('disabled')).to.be.true;
  });

  it('renders the checkbox defaultChecked prop', () => {
    const wrapper = shallow(
      <Checkbox
        defaultChecked={true}
      />
    );

    expect(wrapper.find('input').prop('checked')).to.be.true;
  });

  it('renders the checkbox checked prop', () => {
    const wrapper = shallow(
      <Checkbox
        checked={false}
      />
    );

    expect(wrapper.find('input').prop('checked')).to.be.false;

    wrapper.setProps({
      checked: true,
    });

    expect(wrapper.find('input').prop('checked')).to.be.true;
  });

  it('renders the checkbox className prop', () => {
    const wrapper = shallow(
      <Checkbox
        className="test"
      />
    );

    expect(wrapper.prop('className')).to.be.equal('checkbox test');
  });

  it('clicking on the checkbox triggers onCheck prop', () => {
    const onCheck = spy();
    const wrapper = shallow(
      <Checkbox
        onCheck={onCheck}
      />
    );

    wrapper.find('input').simulate('change');

    expect(onCheck.callCount).to.equal(1);
  });

  it('clicking on the analytics checkbox triggers onEvent prop', () => {
    const onEvent = spy();
    const wrapper = mount(
      <AnalyticsProvider
        onEvent={onEvent}
      >
        <CheckboxWithAnalytics
          gaEventName="test"
        />
      </AnalyticsProvider>
    );

    wrapper.find('input').simulate('change');

    expect(onEvent.callCount).to.equal(1);
    expect(onEvent.args).to.deep.equal([['test']]);
  });
});
