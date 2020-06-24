import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RequiredIcon from '../icons/required';

/**
 * Input component
 */
export default class Input extends PureComponent {
  static propTypes = {
    /**
     * Element tabIndex.
     */
    tabIndex: PropTypes.number,
    /**
     * The CSS class name of the wrapper element.
     */
    className: PropTypes.string,
    /**
     * The default input value, useful when not controlling the component.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * If true, the input will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If true, a textarea element will be rendered.
     */
    multiLine: PropTypes.bool,
    /**
     * Callback fired when the value is changed.
     */
    onChange: PropTypes.func,
    /**
     * Type of the input element. It should be a valid HTML5 input type.
     */
    type: PropTypes.string,
    /**
     * The input value, required for a controlled component.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * If true, the input will be required.
     */
    required: PropTypes.bool,
    /**
     * If false, the input will be unvalid styles.
     */
    valid: PropTypes.bool,
    /**
     * The short hint displayed in the input before the user enters a value.
     */
    placeholder: PropTypes.string,
    /**
     * Color for placeholder
     */
    placeholderColor: PropTypes.string,
    // label: PropTypes.string,
    /**
     * This is what will be displayed in wrapper component
     */
    children: PropTypes.node,
    /**
     * Name attribute of the input element.
     */
    name: PropTypes.string,
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
     * Component text color from theme
     */
    textColor: PropTypes.string,
    /**
     * Component focus color from theme
     */
    colorFocus: PropTypes.string,
    /**
     * Component size.
     */
    size: PropTypes.oneOf(['medium', 'large']),
    /**
     * Component size for mobile.
     */
    mobileSize: PropTypes.oneOf(['medium', 'large']),
    /**
     * Properties applied to the input element.
     */
    inputProps: PropTypes.oneOfType([
      PropTypes.object,
    ]),
    /**
     * This property helps users to fill forms faster, especially on mobile devices.
     * The name can be confusing, as it's more like an autofill.
     */
    autoComplete: PropTypes.string,
    /**
     * If true, the input will be focused during the first mount.
     */
    autoFocus: PropTypes.bool,
  };

  static contextTypes = {
    device: PropTypes.object,
  };

  static defaultProps = {
    tabIndex: 0,
    className: '',
    defaultValue: undefined,
    disabled: false,
    multiLine: false,
    onChange: null,
    type: 'text',
    value: undefined,
    required: false,
    valid: true,
    placeholder: undefined,
    placeholderColor: 'grey_4',
    // label: undefined,
    children: null,
    name: undefined,
    bgType: 'fill',
    color: 'light_grey',
    textColor: 'black',
    colorFocus: 'primary',
    size: 'medium',
    mobileSize: undefined,
    inputProps: {},
    autoComplete: undefined,
    autoFocus: false,
  };

  /**
   * Return input value
   * @return {string}
   */
  getValue = () => {
    const { inputNode } = this;

    return inputNode.value;
  };

  /**
   * Set focus to input
   */
  setFocus = () => {
    const { inputNode } = this;

    inputNode.focus();
  };

  inputNode = null;

  /**
   * Clear input value
   */
  clearValue = () => {
    const { inputNode } = this;

    inputNode.value = '';
  };

  /**
   * Render required icon element
   * @return {ReactElement} markup
   */
  _renderRequiredIcon() {
    const { required } = this.props;

    return required && (
      <RequiredIcon
        className="input_required_icon fill_wrong"
      />
    );
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      tabIndex,
      className,
      defaultValue,
      disabled,
      multiLine,
      onChange,
      type,
      value,
      required,
      valid,
      placeholder,
      placeholderColor,
      // label,
      children,
      name,
      bgType,
      color,
      textColor,
      colorFocus,
      size: propsSize,
      mobileSize,
      inputProps,
      autoComplete,
      autoFocus,
      ...other
    } = this.props;
    const { device } = this.context;
    const {
      className: classNameInput,
      ...otherInputProps
    } = inputProps;
    const Component = multiLine ? 'textarea' : 'input';

    // {label && (
    //   <div
    //     onClick={this.setFocus}
    //     className={s.label}
    //     ref={(node) => { this.labelNode = node; }}
    //   >
    //     {label}
    //   </div>
    // )}

    let size = propsSize || Input.defaultProps.size;

    if (device && mobileSize) {
      if (device.type === 'mobile') {
        size = mobileSize;
      }
    }

    return (
      <div
        data-component="input"
        data-type={bgType}
        data-valid={valid}
        data-disabled={disabled}
        className={classNames(
          'input',
          className,
        )}
        {...other}
      >
        <Component
          ref={(node) => { this.inputNode = node; }}
          type={multiLine ? null : type}
          className={classNames(
            'input_field',
            'round_small',
            [`input_field_${size}`],
            [`stroke_${color}`],
            {
              fill_white: bgType === 'stroke',
              [`fill_${color}`]: bgType === 'fill',
              [`text_${textColor}`]: textColor,
            },
            [`input_field_focus_${colorFocus}`],
            [`input_placeholder_color_${placeholderColor}`],
            classNameInput,
          )}
          tabIndex={tabIndex}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          value={value}
          required={required}
          placeholder={placeholder}
          name={name}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          {...otherInputProps}
        />
        {this._renderRequiredIcon()}
        {children}
      </div>
    );
  }
}
