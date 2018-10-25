import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { shallowWithContext, mountWithContext } from '../../utils/with_context';
import { Checkbox, CheckmarkIcon } from '../../../';

describe('<Checkbox />', () => {
  it('render component', () => {
    const wrapper = shallowWithContext(
      <Checkbox />,
    );

    assert.equal(
      wrapper.prop('className'),
      'checkbox',
    );
    assert.equal(
      wrapper.prop('data-component'),
      'checkbox',
    );
    assert.equal(
      wrapper.prop('data-checked'),
      false,
    );
    assert.equal(
      wrapper.prop('data-disabled'),
      false,
    );
    assert.equal(
      wrapper.prop('data-type'),
      'fill',
    );

    assert.equal(
      wrapper.find('div').at(1).prop('className'),
      'checkbox_container checkbox_fill_light_grey checkbox_fill_primary_checked',
    );

    assert.equal(
      wrapper.find(CheckmarkIcon).prop('className'),
      'checkbox_icon checkbox_fill_grey checkbox_fill_white_checked',
    );
  });

  it('default checked', () => {
    const wrapper = shallowWithContext(
      <Checkbox
        defaultChecked
      />,
    );

    assert.equal(
      wrapper.prop('data-checked'),
      true,
    );
    assert.equal(
      wrapper.state('checkedState'),
      true,
    );
  });

  it('disabled', () => {
    const wrapper = shallowWithContext(
      <Checkbox
        disabled
      />,
    );

    assert.equal(
      wrapper.prop('data-disabled'),
      true,
    );
    assert.equal(
      wrapper.find('input').prop('disabled'),
      true,
    );
  });

  it('set checked value from props', () => {
    const wrapper = shallowWithContext(
      <Checkbox
        checked
      />,
    );

    assert.equal(
      wrapper.prop('data-checked'),
      true,
    );
    assert.equal(
      wrapper.state('checkedState'),
      true,
    );
  });

  it('props for input', () => {
    const wrapper = shallowWithContext(
      <Checkbox
        inputProps={{ name: 'example' }}
      />,
    );

    assert.equal(
      wrapper.find('input').prop('name'),
      'example',
    );
  });

  it('with className', () => {
    const wrapper = shallowWithContext(
      <Checkbox
        className="my-className"
      />,
    );

    assert.equal(
      wrapper.prop('className'),
      'checkbox my-className',
    );
  });

  it('change theme', () => {
    const wrapper = shallowWithContext(
      <Checkbox
        bgType="stroke"
        color="black"
        colorOn="white"
        iconColor="wrong"
        iconColorOn="success"
      />,
    );

    assert.equal(
      wrapper.prop('data-type'),
      'stroke',
    );
    assert.equal(
      wrapper.find('div').at(1).prop('className'),
      'checkbox_container checkbox_stroke_black checkbox_stroke_white_checked',
    );
    assert.equal(
      wrapper.find(CheckmarkIcon).prop('className'),
      'checkbox_icon checkbox_fill_wrong checkbox_fill_success_checked',
    );
  });

  describe('Simulate events', () => {
    it('onCheck', () => {
      const handleAction = sinon.spy();
      const wrapper = mountWithContext(
        <Checkbox
          onCheck={handleAction}
        />,
      );

      wrapper.find('input').simulate('change');
      assert.equal(
        wrapper.find('div').at(0).prop('data-checked'),
        true,
      );
      assert.equal(
        wrapper.state('checkedState'),
        true,
      );

      wrapper.find('input').simulate('change');
      assert.equal(
        wrapper.find('div').at(0).prop('data-checked'),
        false,
      );
      assert.equal(
        wrapper.state('checkedState'),
        false,
      );
      assert.equal(handleAction.callCount, 2);
    });

    it('onKeyUp', () => {
      const handleAction = sinon.spy();
      const wrapper = mountWithContext(
        <Checkbox
          onCheck={handleAction}
        />,
      );

      wrapper.find('input').simulate('keyup', { keyCode: 13 });
      assert.equal(
        wrapper.find('div').at(0).prop('data-checked'),
        true,
      );
      assert.equal(
        wrapper.state('checkedState'),
        true,
      );

      wrapper.find('input').simulate('keyup', { keyCode: 13 });
      assert.equal(
        wrapper.find('div').at(0).prop('data-checked'),
        false,
      );
      assert.equal(
        wrapper.state('checkedState'),
        false,
      );
      assert.equal(handleAction.callCount, 2);
    });
  });

  it('onKeyUp on child', () => {
    const handleAction = sinon.spy();
    const wrapper = mountWithContext(
      <Checkbox
        onCheck={handleAction}
      />,
    );

    wrapper.simulate('keyup', { keyCode: 13 });
    assert.equal(handleAction.notCalled, true);
  });
});
