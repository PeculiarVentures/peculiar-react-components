import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
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

  static propTypes = {
    ...SwitchHandler.propTypes,
    iconType: PropTypes.string,
  };

  static defaultProps = {
    ...SwitchHandler.defaultProps,
    iconType: 'checkmark',
  };

  render() {
    const {
      name,
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
      iconType,
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
          name={name}
        />
        <div
          className={classnames(
            'checkbox_container',
            [`checkbox_${bgType}_${color}`],
            [`checkbox_${bgType}_${colorOn}_checked`],
          )}
          data-component="checkbox_container"
        >
          {
            iconType === 'square' &&
            <div
              data-component="icon"
              className={classnames(
                'checkbox_square',
                [`fill_${iconColor}`],
                [`fill_${iconColorOn}`],
              )}
            />
          }
          {
            iconType === 'checkmark' &&
            <CheckmarkIcon
              data-component="icon"
              className={classnames(
                'checkbox_icon',
                [`checkbox_fill_${iconColor}`],
                [`checkbox_fill_${iconColorOn}_checked`],
              )}
            />
          }
        </div>
        {labelPosition === 'right' ? this.renderLabel() : null}
      </div>
    );
  }
}
