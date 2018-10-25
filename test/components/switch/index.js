import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { shallowWithContext, mountWithContext } from '../../utils/with_context';
import { Switch } from '../../../';

describe('<Switch />', () => {
  it('render component', () => {
    const wrapper = shallowWithContext(
      <Switch />,
    );

    assert.equal(
      wrapper.prop('className'),
      'switch',
    );
    assert.equal(
      wrapper.prop('data-component'),
      'switch',
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
      'switch_container switch_fill_light_grey switch_fill_primary_checked',
    );

    assert.equal(
      wrapper.find('div').at(2).prop('className'),
      'switch_tumbler switch_fill_grey switch_fill_white_checked',
    );
  });

  it('default checked', () => {
    const wrapper = shallowWithContext(
      <Switch
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
      <Switch
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
      <Switch
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
      <Switch
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
      <Switch
        className="my-className"
      />,
    );

    assert.equal(
      wrapper.prop('className'),
      'switch my-className',
    );
  });

  it('change theme', () => {
    const wrapper = shallowWithContext(
      <Switch
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
      'switch_container switch_stroke_black switch_stroke_white_checked',
    );
    assert.equal(
      wrapper.find('div').at(2).prop('className'),
      'switch_tumbler switch_fill_wrong switch_fill_success_checked',
    );
  });

  describe('Simulate events', () => {
    it('onCheck', () => {
      const handleAction = sinon.spy();
      const wrapper = mountWithContext(
        <Switch
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
        <Switch
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
      <Switch
        onCheck={handleAction}
      />,
    );

    wrapper.simulate('keyup', { keyCode: 13 });
    assert.equal(handleAction.notCalled, true);
  });
});
