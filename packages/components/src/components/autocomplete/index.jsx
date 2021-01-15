/* eslint-disable react/require-default-props */
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Popper } from 'react-popper';
import TextField, { validationPropType } from '../text_field';
import SelectDropdown from '../select/select_dropdown';
import SelectItem from '../select/select_item';

/**
 * Autocomplete component
 */
export default class Autocomplete extends React.Component {
  static propTypes = {
    /**
     * The default input value, useful when not controlling the component.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * Array of options.
     */
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
      ]),
    ).isRequired,
    /**
     * Used to determine the string value for a given option.
     * It's used to fill the input (and the list box options
     * if `renderOption` is not provided).
     */
    getOptionLabel: PropTypes.func,
    /**
     * Render the option, use `getOptionLabel` by default.
     */
    renderOption: PropTypes.func,
    /**
     * If true, the input will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * The short hint displayed in the input before the user enters a value.
     */
    placeholder: PropTypes.string,
    /**
     * The CSS class name of the wrapper element.
     */
    className: PropTypes.string,
    /**
     * If true, the input will be required.
     */
    required: PropTypes.bool,
    /**
     * If false, the input will be unvalid styles.
     */
    valid: PropTypes.bool,
    /**
     * Component type one of `fill` or `stroke`.
     * If `fill` - component will be have background-color from `color` props.
     * If `stroke` - component will be have border-color from `color` props.
     */
    bgType: PropTypes.oneOf(['fill', 'stroke']),
    /**
     * Component color from theme.
     */
    color: PropTypes.string,
    /**
     * Component text color from theme.
     */
    textColor: PropTypes.string,
    /**
     * Color for the placeholder.
     */
    placeholderColor: PropTypes.string,
    /**
     * Component focus color from theme.
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
     * Name attribute of the input element.
     */
    name: PropTypes.string,
    /**
     * Element tabIndex.
     */
    tabIndex: PropTypes.number,
    /**
     * If true, the input will be focused during the first mount.
     */
    autoFocus: PropTypes.bool,
    /**
     * Type of the input element.
     */
    type: PropTypes.oneOf([
      'text',
      'email',
      'tel',
    ]),
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
    /**
     * Component dropdown start opened direction.
     */
    placement: PropTypes.oneOf(['top', 'bottom']),
    /**
     * If `true`, component will automatically calc possible dropdown opened direction.
     */
    flip: PropTypes.bool,
    /**
     * Callback fired when the value is changed.
     */
    onChange: PropTypes.func,
    onOptionChange: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
  };

  static defaultProps = {
    defaultValue: '',
    getOptionLabel: x => x,
    disabled: false,
    required: false,
    bgType: 'stroke',
    color: 'light_grey',
    textColor: 'black',
    placeholderColor: 'grey_4',
    colorFocus: 'primary',
    size: 'medium',
    type: 'text',
    tabIndex: 0,
    autoFocus: false,
    inputProps: {},
    placement: 'bottom',
    flip: true,
  };

  state = {
    showOptions: false,
    activeOption: this.props.defaultValue,
    inputValue: this.props.defaultValue,
  };

  getFillteredOptions() {
    const {
      options,
      getOptionLabel,
    } = this.props;
    const {
      showOptions,
      inputValue,
      activeOption,
    } = this.state;

    if (!showOptions) {
      return [];
    }

    if (inputValue === activeOption) {
      return options;
    }

    return options.filter(opt => (
      getOptionLabel(opt).toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    ));
  }

  _refRootElement = React.createRef();
  _refSelectDropdownElement = React.createRef();

  handleClickOption(label) {
    const { onOptionChange } = this.props;

    this.setState({
      activeOption: label,
      inputValue: label,
      showOptions: false,
    });

    if (typeof onOptionChange === 'function') {
      onOptionChange({
        value: label,
      });
    }
  }

  handleChangeField = (event) => {
    const { onChange } = this.props;
    const { activeOption } = this.state;
    const { value } = event.currentTarget;

    this.setState({
      showOptions: true,
      inputValue: value,
      activeOption: value ? activeOption : '',
    });

    if (typeof onChange === 'function') {
      onChange(event);
    }
  }

  handleBlurField = (event) => {
    const { onBlur } = this.props;

    this.setState({
      showOptions: false,
    });

    if (typeof onBlur === 'function') {
      onBlur(event);
    }
  }

  handleClickField = () => {
    const { disabled } = this.props;
    const { inputValue, showOptions } = this.state;

    if (disabled) {
      return;
    }

    if (inputValue) {
      this.setState({
        showOptions: true,
      });
    } else {
      this.setState({
        showOptions: !showOptions,
      });
    }
  }

  handleKeyDownField = (event) => {
    const { disabled, onKeyDown } = this.props;

    if (disabled) {
      return;
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
    }

    // Wait until IME is settled.
    if (event.which !== 229) {
      switch (event.key) {
        case 'ArrowUp': {
          // Prevent scroll of the page
          event.preventDefault();

          if (this._refSelectDropdownElement && this._refSelectDropdownElement.current) {
            this._refSelectDropdownElement.current.focusOption('prev');
          }

          break;
        }

        case 'ArrowDown': {
          // Prevent scroll of the page
          event.preventDefault();

          if (this._refSelectDropdownElement && this._refSelectDropdownElement.current) {
            this._refSelectDropdownElement.current.focusOption();
          }

          break;
        }

        case 'Enter': {
          event.preventDefault();

          if (this._refSelectDropdownElement && this._refSelectDropdownElement.current) {
            this._refSelectDropdownElement.current.clickToFocusedElement();
          }

          break;
        }

        case 'Escape': {
          // Avoid Opera to exit fullscreen mode.
          event.preventDefault();
          // Avoid the Modal to handle the event.
          event.stopPropagation();

          this.handleBlurField();

          break;
        }

        default:
      }
    }
  }

  renderDropDown = options => props => (
    <div
      ref={props.ref}
      style={{
        top: 0,
        left: 0,
        position: props.style.position,
        transform: `translate3d(0px, ${props.style.top}px, 0px)`,
        transformOrigin: 'top center',
      }}
      className="select_dropdown_container"
    >
      <SelectDropdown
        ref={this._refSelectDropdownElement}
        onMouseDown={(event) => {
          // Prevent blur
          event.preventDefault();
        }}
      >
        {this.renderOptions(options)}
      </SelectDropdown>
    </div>
  );

  renderOptions(options) {
    const { renderOption, getOptionLabel, size } = this.props;
    const { activeOption } = this.state;

    return options.map((opt, index) => {
      const label = getOptionLabel(opt);

      return (
        <SelectItem
          key={index}
          data-option-index={index}
          value={label}
          selected={label === activeOption}
          onClick={this.handleClickOption.bind(this, label)}
          size={size}
        >
          {typeof renderOption === 'function' ? renderOption(opt) : label}
        </SelectItem>
      );
    });
  }

  renderField() {
    const {
      disabled,
      placeholder,
      required,
      bgType,
      color,
      textColor,
      colorFocus,
      size,
      valid,
      placeholderColor,
      name,
      mobileSize,
      inputProps,
      validation,
      type,
      tabIndex,
      autoFocus,
    } = this.props;
    const {
      inputValue,
    } = this.state;

    return (
      <TextField
        onChange={this.handleChangeField}
        onBlur={this.handleBlurField}
        onClick={this.handleClickField}
        onKeyDown={this.handleKeyDownField}
        autoComplete="false"
        value={inputValue}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        bgType={bgType}
        color={color}
        textColor={textColor}
        colorFocus={colorFocus}
        size={size}
        valid={valid}
        placeholderColor={placeholderColor}
        name={name}
        mobileSize={mobileSize}
        inputProps={inputProps}
        validation={validation}
        type={type}
        tabIndex={tabIndex}
        autoFocus={autoFocus}
      />
    );
  }

  renderPopup(options) {
    const {
      placement,
      flip,
    } = this.props;

    return (
      <Popper
        modifiers={{
          computeStyle: {
            gpuAcceleration: false,
          },
          preventOverflow: {
            enabled: false,
          },
          hide: {
            enabled: false,
          },
          flip: {
            enabled: flip,
          },
        }}
        positionFixed={false}
        referenceElement={this._refRootElement ? this._refRootElement.current : null}
        placement={placement}
      >
        {this.renderDropDown(options)}
      </Popper>
    );
  }

  render() {
    const {
      defaultValue,
      getOptionLabel,
      renderOption,
      disabled,
      placeholder,
      className,
      required,
      valid,
      bgType,
      color,
      textColor,
      placeholderColor,
      colorFocus,
      size,
      mobileSize,
      name,
      type,
      inputProps,
      validation,
      placement,
      flip,
      onChange,
      onOptionChange,
      onBlur,
      onKeyDown,
      ...other
    } = this.props;
    const {
      showOptions,
    } = this.state;
    const filteredOptions = this.getFillteredOptions();
    const isOpen = showOptions && !!filteredOptions.length;

    return (
      <div
        {...other}
        data-component="autocomplete"
        className={classnames('autocomplete', className)}
        ref={this._refRootElement}
      >
        {this.renderField()}
        {isOpen && this.renderPopup(filteredOptions)}
      </div>
    );
  }
}
