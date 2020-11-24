import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
// @ts-ignore
import { CircularProgress } from './index';

describe('<CircularProgress />', () => {
  it('renders contents', () => {
    const wrapper = shallow(
      <CircularProgress />
    );

    expect(wrapper.prop('data-component')).to.equal('circular-progress');
    expect(wrapper.prop('className')).to.equal('circle_progress');
    expect(wrapper.prop('style')).to.haveOwnProperty('width', CircularProgress.defaultProps.size);
    expect(wrapper.prop('style')).to.haveOwnProperty('height', CircularProgress.defaultProps.size);
    expect(wrapper.find('svg').prop('viewBox')).to.equal('0 0 50 50');

    wrapper.find('circle').forEach((node) => {
      expect(node.prop('cx')).to.equal(25);
      expect(node.prop('cy')).to.equal(25);
      expect(node.prop('r')).to.equal(20);
      expect(node.prop('strokeWidth')).to.equal(4);
    });
  });

  it('renders className prop', () => {
    const wrapper = shallow(
      <CircularProgress
        className="test"
      />
    );

    expect(wrapper.prop('className')).to.equal('circle_progress test');
  });

  it('renders size prop', () => {
    const wrapper = shallow(
      <CircularProgress
        size={10}
      />
    );

    expect(wrapper.prop('style')).to.haveOwnProperty('width', 10);
    expect(wrapper.prop('style')).to.haveOwnProperty('height', 10);
    expect(wrapper.find('svg').prop('viewBox')).to.equal('0 0 50 50');

    wrapper.find('circle').forEach((node) => {
      expect(node.prop('cx')).to.equal(25);
      expect(node.prop('cy')).to.equal(25);
      expect(node.prop('r')).to.equal(20);
      expect(node.prop('strokeWidth')).to.equal(4);
    });
  });

  it('renders thickness prop', () => {
    const wrapper = shallow(
      <CircularProgress
        thickness={6}
      />
    );

    wrapper.find('circle').forEach((node) => {
      expect(node.prop('strokeWidth')).to.equal(6);
    });
  });
});
