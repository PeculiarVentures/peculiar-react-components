import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from './input';
import EyeVisibleIcon from '../icons/eye_visible';
import EyeInvisibleIcon from '../icons/eye_invisible';
import validator from '../../utils/validator';

/**
 * Validate `validation` props
 * @param {object} props
 * @param {string} propName
 * @param {string} componentName
 * @returns {object}
 */
function validationPropType(props, propName, componentName, ...rest) {
  const value = props[propName];

  if (typeof value === 'string') {
    const error = PropTypes.oneOf([
      'password',
      'name',
      'fullName',
      'email',
      'phone',
      'number',
      'text',
      'letters',
      'date',
      'cert',
      'hex',
      'base64',
      'objectID',
      'url',
    ])(props, propName, componentName, ...rest);

    if (error !== null) {
      return error;
    }

    return null;
  }

  const error = PropTypes.func(props, propName, componentName, ...rest);

  if (error !== null) {
    return error;
  }

  return null;
}

/**
 * TextField component
 */
export default class TextField extends PureComponent {
  /**
   * Validate string
   * @param {string} value
   * @param {array} validation
   * @return {boolean}
   */
  static validateValue(value, validation) {
    if (validation) {
      return validator(value, validation);
    }

    return true;
  }

  static propTypes = {
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
     * Callback fired when key up.
     */
    onKeyUp: PropTypes.func,
    /**
     * Callback fired when pressed enter key.
     */
    onEnterPress: PropTypes.func,
    /**
     * Callback fired when field type changed.
     */
    onChangeType: PropTypes.func,
    /**
     * Type of the input element.
     */
    type: PropTypes.oneOf([
      'text',
      'password',
      'email',
      'tel',
      'date',
    ]),
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
    valid: PropTypes.bool,
    /**
     * The short hint displayed in the input before the user enters a value.
     */
    placeholder: PropTypes.string,
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
     * Component size
     */
    size: PropTypes.oneOf(['medium', 'large']),
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
    /**
     * Array with validation types.
     */
    validation: PropTypes.arrayOf(validationPropType),
  };

  static defaultProps = {
    tabIndex: 0,
    className: '',
    defaultValue: undefined,
    disabled: false,
    multiLine: false,
    onChange() {},
    onKeyUp() {},
    onEnterPress() {},
    onChangeType() {},
    type: 'text',
    value: undefined,
    required: false,
    valid: undefined,
    placeholder: undefined,
    name: undefined,
    bgType: 'fill',
    color: 'light_grey',
    textColor: 'black',
    colorFocus: 'primary',
    size: 'medium',
    inputProps: {},
    autoComplete: undefined,
    autoFocus: false,
    validation: undefined,
  };

  state = {
    type: this.props.type,
    valid: TextField.validateValue(
      this.props.value || this.props.defaultValue,
      this.props.validation,
    ),
    hasValue: !!(this.props.value || this.props.defaultValue),
  };

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      this.setState({
        valid: TextField.validateValue(nextProps.value, nextProps.validation),
        hasValue: !!nextProps.value,
      });
    }
  }

  /**
   * Set valid state
   * @param {boolean} value
   */
  setValid(value) {
    const { valid } = this.state;

    if (valid !== value && typeof value === 'boolean') {
      this.setState({
        valid: value,
      });
    }
  }

  inputNode = null;
  passwordButtonNode = null;

  /**
   * onTogglePassword handler
   */
  _onTogglePassword = () => {
    const { type } = this.state;

    if (type === 'text') {
      this._onHidePassword();
    } else {
      this._onShowPassword();
    }
  };

  /**
   * onShowPassword handler
   */
  _onShowPassword = () => {
    const { onChangeType } = this.props;

    this.setState({
      type: 'text',
    });

    onChangeType('text');
  }

  /**
   * onHidePassword handler
   */
  _onHidePassword = () => {
    const { onChangeType } = this.props;

    this.setState({
      type: 'password',
    });

    onChangeType('password');
  }

  /**
   * onEnterPress handler
   * @param {SytheticEvent} e
   */
  _onEnterPress = (e) => {
    const { onKeyUp, onEnterPress } = this.props;
    const { keyCode } = e;

    if (keyCode === 13 && onEnterPress) {
      onEnterPress(e);
    }

    if (onKeyUp) {
      onKeyUp(e);
    }
  };

  /**
   * onChange handler
   * @param {SytheticEvent} e
   */
  _onChange = (e) => {
    const { onChange, validation } = this.props;
    const { value } = e.target;
    const valid = TextField.validateValue(value, validation);

    this.setState({
      valid,
      hasValue: !!value,
    });

    if (onChange) {
      onChange(e, valid);
    }
  };

  /**
   * Validate field value
   */
  validateField() {
    const { validation } = this.props;
    const value = this.inputNode.getValue();
    const valid = TextField.validateValue(value, validation);

    this.setState({
      valid,
      hasValue: !!value,
    });

    return valid;
  }

  /**
   * Return 'valid' state
   * @return {boolean}
   */
  isValid() {
    const { validation } = this.props;
    const value = this.inputNode.getValue();

    return TextField.validateValue(value, validation);
  }

  /**
   * renderPasswordIcon
   * @return {ReactElement} markup
   */
  _renderPasswordIcon() {
    const { type } = this.state;

    return type === 'password' ? (
      <EyeInvisibleIcon
        className="text_field_icon_password"
      />
    ) : (
      <EyeVisibleIcon
        className="text_field_icon_password"
      />
    );
  }

  /**
   * renderPasswordBtn
   * @return {ReactElement} markup
   */
  _renderPasswordBtn() {
    const { multiLine, type } = this.props;

    return (!multiLine && type === 'password') && (
      <div
        onClick={this._onTogglePassword}
        className="text_field_button_password"
        ref={(node) => { this.passwordButtonNode = node; }}
      >
        {this._renderPasswordIcon()}
      </div>
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
      onKeyUp,
      onEnterPress,
      onChangeType,
      type,
      value,
      required,
      valid: validProp,
      placeholder,
      name,
      bgType,
      color,
      textColor,
      colorFocus,
      size,
      inputProps,
      autoComplete,
      autoFocus,
      ...other
    } = this.props;
    const {
      type: typeState,
      valid: validState,
      hasValue,
    } = this.state;

    let valid = true;

    if (typeof validProp === 'boolean') {
      valid = validProp;
    } else if (hasValue) {
      valid = validState;
    }

    return (
      <label
        data-component="text_field"
        data-disabled={disabled}
        className={classNames(
          'text_field',
          className,
        )}
        {...other}
      >
        <Input
          ref={(node) => { this.inputNode = node; }}
          tabIndex={tabIndex}
          defaultValue={defaultValue}
          disabled={disabled}
          multiLine={multiLine}
          type={typeState}
          value={value}
          required={required}
          valid={valid}
          placeholder={placeholder}
          name={name}
          bgType={bgType}
          color={color}
          textColor={textColor}
          colorFocus={colorFocus}
          size={size}
          inputProps={{
            ...inputProps,
            className: classNames(
              inputProps.className,
              {
                text_field_type_password: type === 'password',
              },
            ),
          }}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          onChange={this._onChange}
          onKeyUp={this._onEnterPress}
        >
          {this._renderPasswordBtn()}
        </Input>
      </label>
    );
  }
}
