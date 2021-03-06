/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Popper } from 'react-popper';
import withAnalytics from '../../containers/analytics_hoc';
import SelectDropdown from '../select/select_dropdown';
import SelectItem from '../select/select_item';
import TextField from '../text_field';
import SelectArrowIcon from '../icons/select_arrow';
import { formatNumber } from './format_number';
import { countries } from './countries';
import CountryIcon from './country_icon';

/**
 * PhoneField component.
 */
export class PhoneField extends React.Component {
  static propTypes = {
    /**
     * The default selected country.
     */
    defaultCountry: PropTypes.string,
    /**
     * The default input value, useful when not controlling the component.
     */
    defaultValue: PropTypes.string,
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
     * Component error color from the theme.
     */
    colorError: PropTypes.string,
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
     * Input tabIndex.
     */
    tabIndex: PropTypes.number,
    /**
     * If true, the input will be focused during the first mount.
     */
    autoFocus: PropTypes.bool,
    /**
     * Properties applied to the input element.
     */
    inputProps: PropTypes.object,
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
    /**
     * Callback fired when the input left focus.
     */
    onBlur: PropTypes.func,
    /**
     * Callback fired when the input receives focus.
     */
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    /**
     * This is what will be displayed in wrapper component.
     */
    children: PropTypes.node,
  };

  static defaultProps = {
    defaultCountry: 'US',
    defaultValue: '',
    disabled: false,
    required: false,
    bgType: 'stroke',
    color: 'light_grey',
    textColor: 'black',
    placeholderColor: 'grey_4',
    colorFocus: 'primary',
    colorError: 'wrong',
    size: 'medium',
    tabIndex: 0,
    autoFocus: false,
    inputProps: {},
    placement: 'bottom',
    flip: true,
  };

  constructor(props) {
    super(props);

    const country = countries[props.defaultCountry] || countries.US;
    let value = '';

    if (props.defaultValue) {
      if (props.defaultValue.startsWith(country.dialCode)) {
        value = formatNumber(props.defaultValue, country);
      } else {
        console.warn('Warning:', 'PhoneField component `defaultValue` prop doesn\'t match country dial code. Please change `defaultCountry` or `defaultValue` prop.');
      }
    }

    this.state = {
      showOptions: false,
      activeOption: country,
      inputValue: value,
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside);
  }

  _refRootElement = React.createRef();
  _refSelectDropdown = React.createRef();
  refTextField = React.createRef();

  /**
   * Focus input element.
   */
  focus() {
    this.refTextField.current.focus();
  }

  focusPrevOptionInDropdown() {
    if (this._refSelectDropdown && this._refSelectDropdown.current) {
      this._refSelectDropdown.current.focusOption('prev');
    }
  }

  focusNextOptionInDropdown() {
    if (this._refSelectDropdown && this._refSelectDropdown.current) {
      this._refSelectDropdown.current.focusOption();
    }
  }

  focusValueMatchedOptionInDropdown(value) {
    if (this._refSelectDropdown && this._refSelectDropdown.current) {
      this._refSelectDropdown.current.focusOptionByValue(value);
    }
  }

  clickOnFocusedOptionInDropdown() {
    if (this._refSelectDropdown && this._refSelectDropdown.current) {
      this._refSelectDropdown.current.clickToFocusedElement();
    }
  }

  handleOnChangeCallback(event, newValue, reason) {
    const {
      name,
      required,
      onChange,
    } = this.props;
    const {
      inputValue,
      activeOption,
    } = this.state;

    // Prevent create event if prop `onChange` is empty.
    if (typeof onChange !== 'function') {
      return;
    }

    // Prevent choose the same value.
    if (newValue === inputValue) {
      return;
    }

    // Simulate empty value if value is equal `dialCode`.
    if (newValue === activeOption.dialCode) {
      newValue = '';
    }

    event.persist();

    Object.defineProperty(event, 'target', {
      writable: true,
      value: {
        name,
        value: newValue.replace(/\s/g, ''),
        required,
        country: {
          name: activeOption.name,
          code: activeOption.code,
          dialCode: activeOption.dialCode,
        },
      },
    });

    onChange(event, reason);
  }

  handleChangeField = (event) => {
    const {
      activeOption,
      inputValue,
    } = this.state;
    let { value } = event.target;

    /**
     * If value is empty, show country dial code.
     */
    if (!value.length) {
      this.setState({
        inputValue: activeOption.dialCode,
      });

      this.handleOnChangeCallback(event, activeOption.dialCode);

      return;
    }

    /**
     * Safari paste phone number without country code.
     */
    if (value[0] !== '+') {
      value = `${activeOption.dialCode}${value}`;
    }

    if (value.slice(0, activeOption.dialCode.length) !== activeOption.dialCode) {
      return;
    }

    const formattedNumber = formatNumber(value, activeOption);
    const diff = formattedNumber.length - inputValue.length;
    let caretPosition = event.target.selectionStart;

    this.setState({
      inputValue: formattedNumber,
    }, () => {
      if (diff > 0) {
        caretPosition -= diff;
      }

      const numberInputRef = this.refTextField.current.inputNode.inputNode;

      if (caretPosition > 0 && inputValue.length >= formattedNumber.length) {
        numberInputRef.setSelectionRange(caretPosition, caretPosition);
      }
    });

    this.handleOnChangeCallback(event, formattedNumber);
  }

  handleBlurField = (event) => {
    const { onBlur } = this.props;
    const {
      inputValue,
      activeOption,
    } = this.state;
    const isInputValueTheSameAsCountryDialCode = inputValue === activeOption.dialCode;

    this.setState({
      showOptions: false,
      // Clear the field value if value is equal to `dialCode`.
      inputValue: isInputValueTheSameAsCountryDialCode ? '' : inputValue,
    });

    if (typeof onBlur === 'function') {
      onBlur(event);
    }
  }

  handleFocusField = (event) => {
    const { onFocus } = this.props;

    this.setState(prevState => ({
      showOptions: false,
      // Show `dialCode` when the field is empty.
      inputValue: prevState.inputValue || prevState.activeOption.dialCode,
    }));

    if (typeof onFocus === 'function') {
      onFocus(event);
    }
  }

  handleClickOption = option => (event) => {
    const { activeOption, inputValue } = this.state;
    const isNextOptionTheSame = activeOption.code === option.code;

    this.setState({
      showOptions: false,
      activeOption: option,
      inputValue: isNextOptionTheSame ? inputValue : option.dialCode,
    }, () => {
      // Prevent call change event for the same option.
      if (!isNextOptionTheSame) {
        this.handleOnChangeCallback(event, '', 'select-option');
      }
    });

    this.refTextField.current.focus();
  }

  handleClickSelectButton = () => {
    const { showOptions } = this.state;

    this.setState({
      showOptions: !showOptions,
    });
  }

  handleMouseDownForPreventBlur = (event) => {
    // Prevent blur
    event.preventDefault();
  }

  handleClickOutside = (event) => {
    const { showOptions } = this.state;

    if (showOptions && !this._refRootElement.current.contains(event.target)) {
      this.setState({
        showOptions: false,
      });
    }
  }

  handleKeyDownSelectButton = (event) => {
    const { showOptions } = this.state;

    // Wait until IME is settled.
    if (event.which !== 229) {
      switch (event.key) {
        case 'ArrowUp': {
          // Prevent scroll of the page
          event.preventDefault();

          if (!showOptions) {
            this.setState({
              showOptions: true,
            });
          }

          this.focusPrevOptionInDropdown();

          break;
        }

        case 'ArrowDown': {
          // Prevent scroll of the page
          event.preventDefault();

          if (!showOptions) {
            this.setState({
              showOptions: true,
            });
          }

          this.focusNextOptionInDropdown();

          break;
        }

        case ' ': {
          event.preventDefault();

          if (!showOptions) {
            this.setState({
              showOptions: true,
            });
          }

          break;
        }

        case 'Enter': {
          if (showOptions) {
            event.preventDefault();

            this.clickOnFocusedOptionInDropdown();
          }

          break;
        }

        case 'Escape': {
          // Avoid Opera to exit fullscreen mode.
          event.preventDefault();
          // Avoid the Modal to handle the event.
          event.stopPropagation();

          this.setState({
            showOptions: false,
          });

          break;
        }

        default:
          if (showOptions) {
            this.focusValueMatchedOptionInDropdown(event.key);
          }
      }
    }
  }

  renderOpenButton() {
    const { disabled } = this.props;
    const {
      activeOption,
      showOptions,
    } = this.state;

    return (
      <button
        onClick={this.handleClickSelectButton}
        onKeyDown={this.handleKeyDownSelectButton}
        type="button"
        className={classnames(
          'phone_field_button_country',
          {
            phone_field_button_country_open: showOptions,
          },
        )}
        disabled={disabled}
        aria-label={showOptions ? 'Close' : 'Open'}
        title={showOptions ? 'Close' : 'Open'}
      >
        <CountryIcon
          code={activeOption.code}
          className="phone_field_icon_country"
        />
        <SelectArrowIcon
          className="phone_field_icon_arrow"
        />
      </button>
    );
  }

  renderOptions() {
    const { size } = this.props;
    const { activeOption } = this.state;

    return Object.keys(countries).map((code, index) => {
      const option = countries[code];

      return (
        <SelectItem
          key={option.code}
          value={option.code}
          data-option-index={index}
          onClick={this.handleClickOption(option)}
          selected={activeOption.code === option.code}
          size={size}
        >
          <CountryIcon
            code={code}
            className="phone_field_icon_country"
          />
          {option.name} <span className="phone_field_text_dial_code">{option.dialCode}</span>
        </SelectItem>
      );
    });
  }

  renderDropDown = () => props => (
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
        ref={this._refSelectDropdown}
        onMouseDown={this.handleMouseDownForPreventBlur}
      >
        {this.renderOptions()}
      </SelectDropdown>
    </div>
  );

  renderPopup() {
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
        {this.renderDropDown()}
      </Popper>
    );
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
      colorError,
      size,
      valid,
      placeholderColor,
      name,
      mobileSize,
      inputProps,
      tabIndex,
      autoFocus,
      onKeyDown,
      children,
    } = this.props;
    const {
      inputValue,
    } = this.state;

    return (
      <TextField
        type="tel"
        value={inputValue}
        onChange={this.handleChangeField}
        onBlur={this.handleBlurField}
        onFocus={this.handleFocusField}
        onClick={this.handleClickField}
        onKeyDown={onKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        bgType={bgType}
        color={color}
        textColor={textColor}
        colorFocus={colorFocus}
        colorError={colorError}
        size={size}
        valid={valid}
        placeholderColor={placeholderColor}
        name={name}
        mobileSize={mobileSize}
        inputProps={{
          ...inputProps,
          className: 'phone_field_input',
        }}
        tabIndex={tabIndex}
        autoFocus={autoFocus}
        ref={this.refTextField}
      >
        {children}
      </TextField>
    );
  }

  render() {
    const {
      autoFocus,
      bgType,
      className,
      color,
      colorFocus,
      colorError,
      disabled,
      flip,
      inputProps,
      mobileSize,
      name,
      onBlur,
      onFocus,
      onChange,
      onKeyDown,
      placeholder,
      placeholderColor,
      placement,
      required,
      size,
      tabIndex,
      textColor,
      valid,
      defaultCountry,
      children,
      ...other
    } = this.props;
    const { showOptions } = this.state;

    return (
      <div
        {...other}
        data-component="phone_field"
        className={classnames('phone_field', className)}
        ref={this._refRootElement}
      >
        {this.renderOpenButton()}
        {this.renderField()}
        {showOptions && this.renderPopup()}
      </div>
    );
  }
}

export default withAnalytics(PhoneField, 'onChange');
