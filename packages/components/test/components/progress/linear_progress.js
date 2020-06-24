import React from 'react';
import assert from 'assert';
import { shallowWithContext } from '../../utils/with_context';
import { LinearProgress } from '../../../';

describe('<LinearProgress />', () => {
  it('render component', () => {
    const wrapper = shallowWithContext(
      <LinearProgress />,
    );

    assert.equal(
      wrapper.prop('className'),
      'linear_progress round_small fill_light_grey',
    );
    assert.equal(
      wrapper.prop('data-component'),
      'linear-progress',
    );
    assert.equal(
      wrapper.find('div').at(1).prop('className'),
      'linear_progress_value round_small fill_primary',
    );
    assert.equal(
      wrapper.find('div').at(1).prop('style').width,
      '0%',
    );
  });

  it('not empty progress', () => {
    const wrapper = shallowWithContext(
      <LinearProgress
        value={45}
      />,
    );

    assert.equal(
      wrapper.find('div').at(1).prop('style').width,
      '45%',
    );
  });

  it('with className', () => {
    const wrapper = shallowWithContext(
      <LinearProgress
        className="my-className"
      />,
    );

    assert.equal(
      wrapper.prop('className'),
      'linear_progress round_small fill_light_grey my-className',
    );
  });

  it('change theme', () => {
    const wrapper = shallowWithContext(
      <LinearProgress
        color="black"
        colorProgress="wrong"
      />,
    );

    assert.equal(
      wrapper.prop('className'),
      'linear_progress round_small fill_black',
    );

    assert.equal(
      wrapper.find('div').at(1).prop('className'),
      'linear_progress_value round_small fill_wrong',
    );
  });
});
