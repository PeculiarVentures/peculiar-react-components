import React from 'react';
import classnames from 'classnames';
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
      labelProps,
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
        className={classnames(
          'switch',
          className,
        )}
        {...other}
      >
        {labelPosition === 'left' ? this.renderLabel() : null}
        <input
          {...inputProps}
          tabIndex={tabIndex}
          type="checkbox"
          className="switch_input"
          onChange={this.onChange}
          disabled={disabled}
          checked={checkedState}
        />
        <div
          className={classnames(
            'switch_container',
            [`switch_${bgType}_${color}`],
            [`switch_${bgType}_${colorOn}_checked`],
          )}
        >
          <div
            className={classnames(
              'switch_tumbler',
              [`switch_fill_${iconColor}`],
              [`switch_fill_${iconColorOn}_checked`],
            )}
          />
        </div>
        {labelPosition === 'right' ? this.renderLabel() : null}
      </div>
    );
  }
}
