import React from 'react';
import classnames from 'classnames';
import SwitchHandler from '../switch_handler';
import withAnalytics from '../../containers/analytics_hoc';

/**
 * Switch component
 */
class Switch extends SwitchHandler {
  /**
   * render
   * @return {ReactElement} markup
   */
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
        <input
          {...inputProps}
          tabIndex={tabIndex}
          type="checkbox"
          className="switch_input"
          onChange={this.onChange}
          disabled={disabled}
          checked={checkedState}
          name={name}
        />
        {labelPosition === 'left' ? this.renderLabel() : null}
        <div
          className={classnames(
            'switch_container',
            {
              [`stroke_${color}`]: !checkedState,
              [`fill_${color}`]: !checkedState,
            },
            {
              [`stroke_${colorOn}`]: checkedState,
              [`fill_${colorOn}`]: checkedState,
            },
          )}
          data-component="switch_container"
        >
          <div
            className={classnames(
              'switch_tumbler',
              {
                [`fill_${iconColor}`]: !checkedState,
              },
              {
                [`fill_${iconColorOn}`]: checkedState,
              },
            )}
          />
        </div>
        {labelPosition === 'right' ? this.renderLabel() : null}
      </div>
    );
  }
}

export default withAnalytics(Switch, 'onCheck');
