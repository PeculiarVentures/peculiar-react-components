import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
// @ts-ignore
import { LinearProgress } from './index';

describe('<LinearProgress />', () => {
  it('renders contents', () => {
    const wrapper = shallow(
      <LinearProgress />
    );

    expect(wrapper.prop('data-component')).to.equal('linear-progress');
    expect(wrapper.prop('className')).to.equal('linear_progress round_small fill_light_grey');
    expect(wrapper.prop('aria-valuenow')).to.equal(LinearProgress.defaultProps.value);
  });

  it('renders className prop', () => {
    const wrapper = shallow(
      <LinearProgress
        className="test"
      />
    );

    expect(wrapper.prop('className')).to.equal('linear_progress round_small fill_light_grey test');
  });

  it('renders value prop', () => {
    const wrapper = shallow(
      <LinearProgress
        value={20}
      />
    );

    expect(wrapper.prop('aria-valuenow')).to.equal(20);

    wrapper.setProps({
      value: 200,
    });

    expect(wrapper.prop('aria-valuenow')).to.equal(100);

    wrapper.setProps({
      value: -10,
    });

    expect(wrapper.prop('aria-valuenow')).to.equal(0);
  });
});
