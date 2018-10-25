import React from 'react';
import classNames from 'classnames';
import SwitchHandler from '../switch_handler';

/**
 * Switch component
 */
export default class Switch extends SwitchHandler {
  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      defaultChecked,
      disabled,
      onCheck,
      checked,
      inputProps,
      label,
      labelPosition,
      className,
      tabIndex,
      bgType,
      color,
      colorOn,
      iconColor,
      iconColorOn,
      ...other
    } = this.props;
    const { checkedState } = this.state;

    return (
      <div
        data-component="switch"
        data-type={bgType}
        data-checked={checkedState}
        data-disabled={disabled}
        className={classNames(
          'switch',
          className,
        )}
        {...other}
      >
        <input
          {...inputProps}
          tabIndex={tabIndex}
          type="checkbox"
          className="switch_input"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          disabled={disabled}
          checked={checkedState}
        />
        <div
          className={classNames(
            'switch_container',
            [`switch_${bgType}_${color}`],
            [`switch_${bgType}_${colorOn}_checked`],
          )}
        >
          <div
            className={classNames(
              'switch_tumbler',
              [`switch_fill_${iconColor}`],
              [`switch_fill_${iconColorOn}_checked`],
            )}
          />
        </div>
      </div>
    );
  }
}
