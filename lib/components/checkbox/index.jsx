import React from 'react';
import classnames from 'classnames';
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
        data-component="checkbox"
        data-type={bgType}
        data-checked={checkedState}
        data-disabled={disabled}
        className={classnames(
          'checkbox',
          className,
        )}
        {...other}
      >
        {labelPosition === 'left' ? this.renderLabel() : null}
        <input
          {...inputProps}
          tabIndex={tabIndex}
          type="checkbox"
          className="checkbox_input"
          onChange={this.onChange}
          disabled={disabled}
          checked={checkedState}
        />
        <div
          className={classnames(
            'checkbox_container',
            [`checkbox_${bgType}_${color}`],
            [`checkbox_${bgType}_${colorOn}_checked`],
          )}
        >
          <CheckmarkIcon
            className={classnames(
              'checkbox_icon',
              [`checkbox_fill_${iconColor}`],
              [`checkbox_fill_${iconColorOn}_checked`],
            )}
          />
        </div>
        {labelPosition === 'right' ? this.renderLabel() : null}
      </div>
    );
  }
}
