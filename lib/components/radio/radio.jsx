import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Radio component
 */
export default class Radio extends PureComponent {
  static propTypes = {
    /**
     * If true, the component is checked
     */
    checked: PropTypes.bool,
    /**
     * If true, the component will be disabled
     */
    disabled: PropTypes.bool,
    /**
     * Name attribute for component
     */
    name: PropTypes.string,
    /**
     * The value of the component
     */
    value: PropTypes.string,
    /**
     * Callback fired when the state is changed
     */
    onChange: PropTypes.func,
    /**
     * Properties for `<input type="radio" />` element
     */
    inputProps: PropTypes.oneOfType([
      PropTypes.object,
    ]),
    /**
     * Label for radio
     */
    label: PropTypes.node,
    /**
     * Where the label will be placed next to the radio
     */
    labelPosition: PropTypes.oneOf(['left', 'right']),
    /**
     * The CSS class name of the root element
     */
    className: PropTypes.string,
    /**
     * The tabIndex of the root element
     */
    tabIndex: PropTypes.number,
    /**
     * Component type one of `fill` or `stroke`.
     * If `fill` - component will be have background-color from `color` props.
     * If `stroke` - component will be have border-color from `color` props.
     */
    bgType: PropTypes.oneOf(['fill', 'stroke']),
    /**
     * Component color from theme
     */
    color: PropTypes.string,
    /**
     * Component checked color from theme
     */
    colorOn: PropTypes.string,
    /**
     * Component icon color from theme
     */
    iconColor: PropTypes.string,
    /**
     * Component checked icon color from theme
     */
    iconColorOn: PropTypes.string,
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    name: undefined,
    value: undefined,
    onChange() {},
    inputProps: {},
    label: undefined,
    labelPosition: 'left',
    className: '',
    tabIndex: 0,
    bgType: 'fill',
    color: 'light_grey',
    colorOn: 'primary',
    iconColor: 'grey',
    iconColorOn: 'white',
  };

  /**
   * onChange handler
   * @param {SytheticEvent} e
   */
  onChange = (e) => {
    const { onChange } = this.props;

    onChange(e, e.target.value);
  };

  /**
   * onKeyUp handler
   * @param {SytheticEvent} e
   */
  onKeyUp = (e) => {
    const keyCode = e.keyCode;

    if (keyCode === 13) {
      this.onChange(e);
    }
  };

  /**
   * renderLabel
   * @return {ReactElement} markup
   */
  renderLabel() {
    const { label } = this.props;

    if (label) {
      return (
        <div className="label">
          {label}
        </div>
      );
    }

    return null;
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      checked,
      disabled,
      name,
      value,
      onChange,
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

    return (
      <div
        data-component="radio"
        data-type={bgType}
        data-checked={checked}
        data-disabled={disabled}
        className={classNames(
          'radio',
          className,
        )}
        {...other}
      >
        <input
          {...inputProps}
          tabIndex={tabIndex}
          type="radio"
          name={name}
          value={value}
          className="radio_input"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          disabled={disabled}
          checked={checked}
        />
        <div
          className={classNames(
            'radio_container',
            [`radio_${bgType}_${color}`],
            [`radio_${bgType}_${colorOn}_checked`],
          )}
        >
          <div
            className={classNames(
              'radio_tumbler',
              [`radio_fill_${iconColorOn}_checked`],
            )}
          />
        </div>
      </div>
    );
  }
}