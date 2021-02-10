/* eslint-disable react/require-default-props */
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Popper } from 'react-popper';
import SelectDropdown from './select_dropdown';
import SelectItem from './select_item';
import TextField from '../text_field';
import SelectArrowIcon from '../icons/select_arrow';
import withAnalytics from '../../containers/analytics_hoc';

/**
 * Select component
 */
class Select extends React.Component {
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
      PropTypes.shape({
        label: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      }),
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
     * Properties applied to the input element.
     */
    inputProps: PropTypes.oneOfType([
      PropTypes.object,
    ]),
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
     * The icon that displays the arrow.
     */
    iconComponent: PropTypes.node,
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

  handleBlurField = (event) => {
    const { onBlur } = this.props;

    this.setState({
      showOptions: false,
    });

    if (typeof onBlur === 'function') {
      onBlur(event);
    }
  }

  handleKeyDownField = (event) => {
    const { disabled, onKeyDown } = this.props;
    const { showOptions } = this.state;

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
          event.preventDefault();

          if (!showOptions) {
            this.setState({
              showOptions: true,
            });
          }

          this.clickOnFocusedOptionInDropdown();

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

  handleClickOption = option => (event) => {
    const { onChange, name, required } = this.props;
    const { activeOption } = this.state;

    // Prevent choose the same value.
    if (activeOption === option.value) {
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
        activeOption: option.value,
      });
    }

    if (typeof onChange === 'function') {
      event.persist();

      Object.defineProperty(event, 'target', {
        writable: true,
        value: {
          name,
          value: option.value,
          required,
        },
      });

      onChange(event);
    }
  }

  handleMouseDownForPreventBlur = (event) => {
    // Prevent blur
    event.preventDefault();
  }

  renderOpenButton() {
    const { iconComponent } = this.props;
    const { showOptions } = this.state;

    return (
      <div
        className={classnames(
          'select_button',
          {
            select_button_open: showOptions,
          },
        )}
        focusable="false"
        aria-hidden
      >
        {iconComponent || <SelectArrowIcon className="select_arrow_icon" />}
      </div>
    );
  }

  renderOptions(options) {
    const { size, renderOption, getOptionDisabled } = this.props;
    const { activeOption } = this.state;

    return options.map((option, index) => (
      <SelectItem
        key={option.value}
        value={option.value}
        data-option-index={index}
        selected={activeOption === option.value}
        size={size}
        onClick={this.handleClickOption(option)}
        disabled={typeof getOptionDisabled === 'function' ? getOptionDisabled(option) : false}
      >
        {typeof renderOption === 'function' ? renderOption(option) : option.label}
      </SelectItem>
    ));
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
        onMouseDown={this.handleMouseDownForPreventBlur}
      >
        {this.renderOptions(options)}
      </SelectDropdown>
    </div>
  );

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
      placeholderColor,
      name,
      mobileSize,
      inputProps,
      options,
      tabIndex,
      autoFocus,
      onFocus,
    } = this.props;
    const {
      activeOption,
    } = this.state;
    const option = options.find(opt => opt.value === activeOption);

    return (
      <TextField
        autoComplete="off"
        className="select_field"
        onBlur={this.handleBlurField}
        onFocus={onFocus}
        onClick={this.handleClickField}
        onKeyDown={this.handleKeyDownField}
        value={option ? option.label : ''}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        bgType={bgType}
        color={color}
        textColor={textColor}
        colorFocus={colorFocus}
        size={size}
        placeholderColor={placeholderColor}
        name={name}
        mobileSize={mobileSize}
        inputProps={{
          ...inputProps,
          readOnly: true,
          className: 'select_input',
        }}
        tabIndex={tabIndex}
        autoFocus={autoFocus}
        ref={this.refTextField}
      >
        {this.renderOpenButton()}
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
      defaultValue,
      disabled,
      flip,
      iconComponent,
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
      value,
      ...other
    } = this.props;
    const { showOptions } = this.state;

    return (
      <div
        {...other}
        data-component="select"
        className={classnames('select', className)}
        ref={this._refRootElement}
      >
        {this.renderField()}
        {showOptions && this.renderPopup(options)}
      </div>
    );
  }
}

export default withAnalytics(Select, 'onChange');
