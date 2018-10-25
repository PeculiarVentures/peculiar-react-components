import React from 'react';
import assert from 'assert';
import { shallowWithContext } from '../../utils/with_context';
import { Typography } from '../../../';

describe('<Typography />', () => {
  it('render component', () => {
    const wrapper = shallowWithContext(
      <Typography>
        Lorem
      </Typography>,
    );

    assert.equal(
      wrapper.find('p').prop('className'),
      'text_black text_left b1',
    );
    assert.equal(
      wrapper.contains('Lorem'),
      true,
    );
    assert.equal(
      wrapper.prop('data-component'),
      'typography',
    );
  });

  it('with className', () => {
    const wrapper = shallowWithContext(
      <Typography
        className="my-className"
      >
        Lorem
      </Typography>,
    );

    assert.equal(
      wrapper.find('p').prop('className'),
      'text_black text_left my-className b1',
    );
  });

  it('change type', () => {
    const wrapper = shallowWithContext(
      <Typography
        type="h1"
      >
        Lorem
      </Typography>,
    );

    assert.equal(
      wrapper.find('h1').prop('className'),
      'text_black text_left h1',
    );
  });

  it('change theme', () => {
    const wrapper = shallowWithContext(
      <Typography
        color="wrong"
        align="center"
      >
        Lorem
      </Typography>,
    );

    assert.equal(
      wrapper.find('p').prop('className'),
      'text_wrong text_center b1',
    );
  });

  it('device attributes', () => {
    const wrapper = shallowWithContext(
      <Typography
        tabletType="h1"
        mobileType="c1"
      >
        Lorem
      </Typography>,
    );

    assert.equal(
      wrapper.prop('data-classnamedesktop'),
      'text_black text_left',
    );
    assert.equal(
      wrapper.prop('data-classnametablet'),
      'text_black text_left h1',
    );
    assert.equal(
      wrapper.prop('data-classnamemobile'),
      'text_black text_left c1',
    );
  });

  it('device attributes', () => {
    const wrapper = shallowWithContext(
      <Typography
        tabletType="h1"
        mobileType="c1"
      >
        Lorem
      </Typography>,
    );

    assert.equal(
      wrapper.find('p').prop('className'),
      'text_black text_left b1',
    );
    wrapper.setContext({
      theme: {
        text_black: 'text_black',
        text_left: 'text_left',
        b1: 'b1',
        h1: 'h1',
        c1: 'c1',
      },
      device: {
        type: 'tablet',
      },
    });
    assert.equal(
      wrapper.find('h1').prop('className'),
      'text_black text_left h1',
    );
    wrapper.setContext({
      theme: {
        text_black: 'text_black',
        text_left: 'text_left',
        b1: 'b1',
        h1: 'h1',
        c1: 'c1',
      },
      device: {
        type: 'mobile',
      },
    });
    assert.equal(
      wrapper.find('p').prop('className'),
      'text_black text_left c1',
    );
  });

  it('othrt props', () => {
    const wrapper = shallowWithContext(
      <Typography
        id="my-id"
      >
        Lorem
      </Typography>,
    );

    assert.equal(
      wrapper.find('p').prop('id'),
      'my-id',
    );
  });
});
