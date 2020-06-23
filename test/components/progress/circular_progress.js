import React from 'react';
import assert from 'assert';
import { shallowWithContext } from '../../utils/with_context';
import { CircularProgress } from '../../../';

describe('<CircularProgress />', () => {
  it('render component', () => {
    const wrapper = shallowWithContext(
      <CircularProgress />,
    );

    assert.equal(
      wrapper.prop('className'),
      'circle_progress',
    );
    assert.deepEqual(
      wrapper.prop('style'),
      {
        height: 24,
        width: 24,
      },
    );
    assert.equal(
      wrapper.prop('data-component'),
      'circular-progress',
    );
    assert.equal(
      wrapper.find('circle').at(0).prop('className'),
      'circle_progress_stroke_light_grey',
    );
    assert.equal(
      wrapper.find('circle').at(1).prop('className'),
      'circle_progress_circle circle_progress_stroke_primary',
    );
  });

  it('change size', () => {
    const wrapper = shallowWithContext(
      <CircularProgress
        size={60}
        thickness={5}
      />,
    );

    assert.deepEqual(
      wrapper.prop('style'),
      {
        height: 60,
        width: 60,
      },
    );
    assert.equal(
      wrapper.find('circle').at(0).prop('strokeWidth'),
      5,
    );
    assert.equal(
      wrapper.find('circle').at(1).prop('strokeWidth'),
      5,
    );
  });

  it('with className', () => {
    const wrapper = shallowWithContext(
      <CircularProgress
        className="my-className"
      />,
    );

    assert.equal(
      wrapper.prop('className'),
      'circle_progress my-className',
    );
  });

  it('change theme', () => {
    const wrapper = shallowWithContext(
      <CircularProgress
        color="black"
        colorProgress="wrong"
      />,
    );

    assert.equal(
      wrapper.find('circle').at(0).prop('className'),
      'circle_progress_stroke_black',
    );

    assert.equal(
      wrapper.find('circle').at(1).prop('className'),
      'circle_progress_circle circle_progress_stroke_wrong',
    );
  });
});
