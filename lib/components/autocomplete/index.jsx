import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TextField from '../text_field';
import SelectDropdown from '../select/select_dropdown';

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

export default class Autocomplete extends Component {
  static propTypes = {
    children: PropTypes.node,
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
     * Callback fired when the value is changed.
     */
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
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
    value: PropTypes.oneOfType([ // eslint-disable-line
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
     * Array with validation types.
     */
    validation: PropTypes.arrayOf(validationPropType),
  }

  static defaultProps = {
    children: null,
    className: '',
    defaultValue: undefined,
    disabled: false,
    onChange() {},
    onFocus() {},
    onBlur() {},
    onKeyDown() {},
    type: 'text',
    required: false,
    valid: undefined,
    placeholder: undefined,
    placeholderColor: 'grey_4',
    name: undefined,
    bgType: 'fill',
    color: 'light_grey',
    textColor: 'black',
    colorFocus: 'primary',
    size: 'medium',
    mobileSize: undefined,
    inputProps: {},
    validation: undefined,
  }

  state = {
    open: false,
    valueSelected: null,
  };

  componentWillUnmount() {
    clearTimeout(this._inputBlurTimeout);
    clearTimeout(this._inputFocusTimeout);
    clearTimeout(this._overlayBlurTimeout);
  }

  _inputBlurTimeout = null;
  _inputFocusTimeout = null;
  _overlayBlurTimeout = null;
  _overlayHasFocus = false;
  _childrenValues = [];
  textFieldNode = null;

  _onBlurInput = (e) => {
    const { onBlur } = this.props;

    this._inputBlurTimeout = window.setTimeout(
      () => {
        if (!this._overlayHasFocus) {
          this._closeDropdown();

          onBlur(e);
        }
      },
      1,
    );
  }

  _onFocusInput = (e) => {
    const { onFocus } = this.props;

    this._inputFocusTimeout = window.setTimeout(
      () => { this._overlayHasFocus = false; },
      2,
    );

    onFocus(e);
  }

  _onFocusOverlay = (e) => {
    e.preventDefault();

    this._overlayHasFocus = true;
    this.textFieldNode.inputNode.inputNode.focus();
  }

  _onBlurOverlay = () => {
    this._overlayBlurTimeout = window.setTimeout(
      () => { this._overlayHasFocus = false; },
      3,
    );
  }

  _closeDropdown() {
    const { open } = this.state;

    if (!open) {
      return;
    }

    this.setState({
      open: false,
    });
  }

  _openDropdown() {
    const { open } = this.state;

    if (open) {
      return;
    }

    this.setState({
      open: true,
    });
  }

  _onKeyDownInput = (event) => {
    const {
      onKeyDown,
      disabled,
      name,
    } = this.props;
    const {
      open,
    } = this.state;

    if (!disabled) {
      const { keyCode } = event;

      /**
       * escape key press
       * hide dropdown list
       */
      if (keyCode === 27) {
        this._closeDropdown();
      }

      /**
       * space key press
       * hide dropdown or select element in dropdown list
       */
      if (keyCode === 32) {
        event.preventDefault();
        this._handleSpaceEnterPress(event);
      }

      /**
       * enter key press
       * hide dropdown or select element in dropdown list
       */
      if (keyCode === 13 && open) {
        event.preventDefault();
        this._handleSpaceEnterPress(event);
      }

      /**
       * up key press
       * select prev element in dropdown list
       */
      if (keyCode === 38) {
        event.preventDefault();
        this._handleItemHovered('up');
      }

      /**
       * down key press
       * select next element in dropdown list
       */
      if (keyCode === 40) {
        event.preventDefault();
        this._handleItemHovered('down');
      }
    }

    onKeyDown(event, name);
  };

  _handleSpaceEnterPress(e) {
    const { name, onChange } = this.props;
    const {
      valueSelected,
      open,
    } = this.state;

    if (open && valueSelected) {
      if (!('value' in this.props)) {
        this.textFieldNode.inputNode.inputNode.value = valueSelected;
        this.textFieldNode.validateField();
      }

      this._closeDropdown();

      onChange(e, valueSelected, name, 'select');
    }
  }

  _handleItemHovered(type) {
    const { valueSelected, open } = this.state;
    const { _childrenValues } = this;

    if (!open) return;

    if (!type) {
      this.setState({
        valueSelected: _childrenValues[0],
      }, this._handleScrollToElement);

      return;
    }

    const valueIndex = _childrenValues.indexOf(valueSelected);
    const prevValue = _childrenValues[valueIndex - 1];
    const nextValue = _childrenValues[valueIndex + 1];

    if (type === 'up' && prevValue) {
      this.setState({
        valueSelected: prevValue,
      }, this._handleScrollToElement);
    }

    if (type === 'down' && nextValue) {
      this.setState({
        valueSelected: nextValue,
      }, this._handleScrollToElement);
    }
  }

  _handleScrollToElement() {
    if (this.dropdownNode) {
      this.dropdownNode.scrollToFocusedElement();
    }
  }

  _onClickSelectItem = child => (e) => {
    const { onChange, name } = this.props;
    const valueChild = child.props.value;

    this._closeDropdown();

    if (!('value' in this.props)) {
      this.textFieldNode.inputNode.inputNode.value = valueChild;
      this.textFieldNode.validateField();
    }

    onChange(e, valueChild, name, 'select');
  };

  _onChangeInput = (e) => {
    const { onChange, name } = this.props;
    const value = e.target.value;

    this._openDropdown();

    onChange(e, value, name);
  }

  render() {
    const {
      className,
      defaultValue,
      disabled,
      onChange,
      onFocus,
      onBlur,
      type,
      value,
      required,
      valid,
      placeholder,
      name,
      bgType,
      color,
      textColor,
      colorFocus,
      size,
      mobileSize,
      inputProps,
      children,
      validation,
      placeholderColor,
      ...other
    } = this.props;
    const {
      open,
      valueSelected,
    } = this.state;

    this._childrenValues = [];

    const options = Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return null;
      }

      const {
        value: valueChild,
        disabled: disabledChild,
      } = child.props;
      const selected = false;

      if (!disabledChild) {
        this._childrenValues.push(valueChild);
      }

      return cloneElement(child, {
        onClick: disabledChild ? null : this._onClickSelectItem(child),
        selected,
        hasFocus: valueSelected === valueChild,
        size,
        textColor,
        colorFocus,
      });
    });
    const mustOpen = open && options && options.length > 0;

    return (
      <div
        data-component="autocomplete"
        data-open={mustOpen}
        data-disabled={disabled}
        className={classnames(
          'autocomplete',
          className,
        )}
        {...other}
      >
        <TextField
          placeholder={placeholder}
          onBlur={this._onBlurInput}
          onFocus={this._onFocusInput}
          onChange={this._onChangeInput}
          onKeyDown={this._onKeyDownInput}
          size={size}
          mobileSize={mobileSize}
          textColor={textColor}
          colorFocus={colorFocus}
          bgType={bgType}
          color={color}
          ref={(node) => { this.textFieldNode = node; }}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          type={type}
          required={required}
          valid={valid}
          name={name}
          inputProps={inputProps}
          autoComplete="off"
          validation={validation}
        />
        {(options && options.length > 0) && (
          <SelectDropdown
            className="autocomplete_dropdown"
            bgType={bgType}
            color={color}
            colorFocus={colorFocus}
            ref={(node) => { this.dropdownNode = node; }}
            tabIndex={0}
            onFocus={this._onFocusOverlay}
            onBlur={this._onBlurOverlay}
          >
            {options}
          </SelectDropdown>
        )}
      </div>
    );
  }
}
