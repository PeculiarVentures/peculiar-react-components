/* eslint-disable react/require-default-props */
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Popper } from 'react-popper';
import TextField, { validationPropType } from '../text_field';
import SelectDropdown from '../select/select_dropdown';
import SelectItem from '../select/select_item';
import withAnalytics from '../../containers/analytics_hoc';

/**
 * Autocomplete component
 */
class Autocomplete extends React.Component {
  static propTypes = {
    /**
     * The default input value, useful when not controlling the component.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * The input value.
     */
    value: PropTypes.oneOfType([
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
      ]),
    ).isRequired,
    /**
     * Render the option.
     */
    renderOption: PropTypes.func,
    /**
     * Used to determine the disabled state for a given option.
     */
    getOptionDisabled: PropTypes.func,
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
     * If `true`, the options can't be filtered.
     */
    disableFiltering: PropTypes.bool,
  };

  static defaultProps = {
    defaultValue: '',
    disabled: false,
    required: false,
    bgType: 'stroke',
    color: 'light_grey',
    textColor: 'black',
    placeholderColor: 'grey_4',
    colorFocus: 'primary',
    size: 'medium',
    tabIndex: 0,
    autoFocus: false,
    inputProps: {},
    placement: 'bottom',
    flip: true,
    type: 'text',
    disableFiltering: false,
  };

  state = {
    showOptions: false,
    activeOption: this.props.value || this.props.defaultValue,
  };

  static getDerivedStateFromProps(props, state) {
    if ('value' in props && props.value !== state.activeOption) {
      return {
        activeOption: props.value,
      };
    }

    return null;
  }

  /**
   * Get components value.
   * @return {string|number}
   */
  getValue() {
    return this.state.activeOption;
  }

  /**
   * Set select value
   * @param {string|number} value
   */
  setValue = value => (
    this.setState({
      activeOption: value,
    })
  )

  getFillteredOptions() {
    const {
      options,
      disableFiltering,
    } = this.props;
    const {
      showOptions,
      activeOption,
    } = this.state;

    if (!showOptions) {
      return [];
    }

    if (disableFiltering) {
      return options;
    }

    return options.filter(opt => (
      opt.toLowerCase().indexOf(activeOption.toLowerCase()) > -1
    ));
  }

  /**
   * Focus input element.
   */
  focus() {
    this.refTextField.current.focus();
  }

  _refRootElement = React.createRef();
  _refSelectDropdown = React.createRef();
  refTextField = React.createRef();

  handleClickOption = label => (event) => {
    const {
      onChange,
      name,
      required,
    } = this.props;
    const {
      activeOption,
    } = this.state;

    // Prevent choose the same value.
    if (activeOption === label) {
      this.setState({
        showOptions: false,
      });

      return;
    }

    if ('value' in this.props) {
      this.setState({
        showOptions: false,
      });
    } else {
      this.setState({
        showOptions: false,
        activeOption: label,
      });
    }

    if (typeof onChange === 'function') {
      event.persist();

      Object.defineProperty(event, 'target', {
        writable: true,
        value: {
          name,
          value: label,
          required,
        },
      });

      onChange(event, 'select-option');
    }
  }

  handleChangeField = (event) => {
    const { onChange } = this.props;
    const { value } = event.currentTarget;

    if ('value' in this.props) {
      this.setState({
        showOptions: true,
      });
    } else {
      this.setState({
        showOptions: true,
        activeOption: value,
      });
    }

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
    const { showOptions } = this.state;

    if (disabled) {
      return;
    }

    this.setState({
      showOptions: !showOptions,
    });
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

          if (this._refSelectDropdown && this._refSelectDropdown.current) {
            this._refSelectDropdown.current.focusOption('prev');
          }

          break;
        }

        case 'ArrowDown': {
          // Prevent scroll of the page
          event.preventDefault();

          if (this._refSelectDropdown && this._refSelectDropdown.current) {
            this._refSelectDropdown.current.focusOption();
          }

          break;
        }

        case 'Enter': {
          event.preventDefault();

          if (this._refSelectDropdown && this._refSelectDropdown.current) {
            this._refSelectDropdown.current.clickToFocusedElement();
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
        ref={this._refSelectDropdown}
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
    const { renderOption, size, getOptionDisabled } = this.props;
    const { activeOption } = this.state;

    return options.map((option, index) => (
      <SelectItem
        key={option}
        data-option-index={index}
        value={option}
        selected={option === activeOption}
        onClick={this.handleClickOption(option)}
        size={size}
        disabled={typeof getOptionDisabled === 'function' ? getOptionDisabled(option) : false}
      >
        {typeof renderOption === 'function' ? renderOption(option) : option}
      </SelectItem>
    ));
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
      onFocus,
    } = this.props;
    const {
      activeOption,
    } = this.state;

    return (
      <TextField
        autoComplete="off"
        onChange={this.handleChangeField}
        onBlur={this.handleBlurField}
        onFocus={onFocus}
        onClick={this.handleClickField}
        onKeyDown={this.handleKeyDownField}
        value={activeOption}
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
        ref={this.refTextField}
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
      autoFocus,
      bgType,
      className,
      color,
      colorFocus,
      defaultValue,
      disabled,
      flip,
      inputProps,
      mobileSize,
      name,
      onBlur,
      onFocus,
      onChange,
      onKeyDown,
      options,
      placeholder,
      placeholderColor,
      placement,
      renderOption,
      getOptionDisabled,
      required,
      size,
      tabIndex,
      textColor,
      type,
      valid,
      validation,
      value,
      disableFiltering,
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

export default withAnalytics(Autocomplete, 'onChange');
