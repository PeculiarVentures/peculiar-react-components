import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import withAnalytics from '../../containers/analytics_hoc';
import SwitchHandler from '../switch_handler';
import CheckmarkIcon from '../icons/checkmark';

/**
 * Checkbox component
 */
class Checkbox extends SwitchHandler {
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
        {labelPosition === 'left' ? this.renderLabel() : null}
        <div
          className={classnames(
            'checkbox_container',
            {
              [`stroke_${color}`]: !checkedState,
              [`fill_${color}`]: !checkedState,
            },
            {
              [`stroke_${colorOn}`]: checkedState,
              [`fill_${colorOn}`]: checkedState,
            },
          )}
          data-component="checkbox_container"
        >
          {iconType === 'square' ? (
            <div
              className={classnames(
                'checkbox_icon_square',
                {
                  [`fill_${iconColor}`]: !checkedState,
                },
                {
                  [`fill_${iconColorOn}`]: checkedState,
                },
              )}
            />
          ) : (
            <CheckmarkIcon
              className={classnames(
                'checkbox_icon_checkmark',
                {
                  [`fill_${iconColor}`]: !checkedState,
                },
                {
                  [`fill_${iconColorOn}`]: checkedState,
                },
              )}
            />
          )}
        </div>
        {labelPosition === 'right' ? this.renderLabel() : null}
      </div>
    );
  }
}

export default withAnalytics(Checkbox, 'onCheck');
