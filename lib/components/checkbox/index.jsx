import React from 'react';
import classNames from 'classnames';
import SwitchHandler from '../switch_handler';
import CheckmarkIcon from '../icons/checkmark';

/**
 * Checkbox component
 */
export default class Checkbox extends SwitchHandler {
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
        data-component="checkbox"
        data-type={bgType}
        data-checked={checkedState}
        data-disabled={disabled}
        className={classNames(
          'checkbox',
          className,
        )}
        {...other}
      >
        <input
          {...inputProps}
          tabIndex={tabIndex}
          type="checkbox"
          className="checkbox_input"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          disabled={disabled}
          checked={checkedState}
        />
        <div
          className={classNames(
            'checkbox_container',
            [`checkbox_${bgType}_${color}`],
            [`checkbox_${bgType}_${colorOn}_checked`],
          )}
        >
          <CheckmarkIcon
            className={classNames(
              'checkbox_icon',
              [`checkbox_fill_${iconColor}`],
              [`checkbox_fill_${iconColorOn}_checked`],
            )}
          />
        </div>
      </div>
    );
  }
}
