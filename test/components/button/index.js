import React from 'react';
import assert from 'assert';
import { spy } from 'sinon';
import { shallowWithContext, mountWithContext } from '../../utils/with_context';
import { Button } from '../../../';

describe('<Button />', () => {
  it('render component', () => {
    const wrapper = shallowWithContext(
      <Button>
        Button
      </Button>,
    );

    assert.equal(
      wrapper.prop('className'),
      'button round_small text_center button_medium button_fill_primary button_text_white',
    );
    assert.equal(
      wrapper.prop('disabled'),
      false,
    );
    assert.equal(
      wrapper.prop('data-component'),
      'button',
    );
  });

  it('change theme', () => {
    const wrapper = shallowWithContext(
      <Button
        bgType="stroke"
        color="secondary"
        textColor="black"
        size="medium"
      >
        Button
      </Button>,
    );

    assert.equal(
      wrapper.prop('className'),
      'button round_small text_center button_medium button_stroke_secondary button_text_black',
    );
  });

  it('link', () => {
    const wrapper = shallowWithContext(
      <Button href="/">
        Button
      </Button>,
    );

    assert.equal(
      wrapper.find('a').prop('href'),
      '/',
    );
  });

  it('disable link', () => {
    const wrapper = shallowWithContext(
      <Button
        href="/"
        disabled
      >
        Button
      </Button>,
    );

    assert.equal(
      wrapper.find('button').prop('disabled'),
      true,
    );
    assert.equal(
      wrapper.find('button').prop('href'),
      undefined,
    );
  });

  it('with children', () => {
    const wrapper = shallowWithContext(
      <Button>
        <p>Button</p>
      </Button>,
    );

    assert.equal(
      wrapper.contains(<p>Button</p>),
      true,
    );
  });

  it('with className', () => {
    const wrapper = shallowWithContext(
      <Button className="my-className">
        Button
      </Button>,
    );

    assert.equal(
      wrapper.prop('className'),
      'button round_small text_center button_medium button_fill_primary button_text_white my-className',
    );
  });

  it('other props', () => {
    const wrapper = shallowWithContext(
      <Button type="submit">
        Button
      </Button>,
    );

    assert.equal(
      wrapper.prop('type'),
      'submit',
    );
  });

  describe('Simulate events', () => {
    it('click', () => {
      const handleAction = spy();
      const wrapper = mountWithContext(
        <Button onClick={handleAction}>
          Button
        </Button>,
      );

      wrapper.simulate('click');
      assert.equal(handleAction.calledOnce, true);
    });

    it('click to disabled', () => {
      const handleAction = spy();
      const wrapper = mountWithContext(
        <Button onClick={handleAction} disabled>
          Button
        </Button>,
      );

      wrapper.simulate('click');
      assert.equal(handleAction.notCalled, true);
    });
  });
});
