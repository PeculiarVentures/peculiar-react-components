import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Popper } from 'react-popper';
import TextField from '../text_field';
import SelectDropdown from '../select/select_dropdown';
import SelectItem from '../select/select_item';

export default class Autocomplete extends React.Component {
  static propTypes = {
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
     * If `true`, the Autocomplete is free solo, meaning that the user
     * input is not bound to provided options.
     */
    freeSolo: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    required: PropTypes.bool,
    bgType: PropTypes.oneOf(['fill', 'stroke']),
    color: PropTypes.string,
    textColor: PropTypes.string,
    colorFocus: PropTypes.string,
    size: PropTypes.oneOf(['medium', 'large']),
    placement: PropTypes.oneOf(['top', 'bottom']),
    flip: PropTypes.bool,
  };

  static defaultProps = {
    getOptionLabel: x => x,
    freeSolo: false,
    disabled: false,
    required: false,
    bgType: 'stroke',
    color: 'light_grey',
    textColor: 'black',
    colorFocus: 'primary',
    size: 'medium',
    placement: 'bottom',
    flip: true,
  };

  state = {
    showOptions: false,
    activeOption: '',
    inputValue: '',
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
    this.setState({
      activeOption: label,
      inputValue: label,
      showOptions: false,
    });
  }

  handleChangeField = (event) => {
    const { activeOption } = this.state;
    const { value } = event.currentTarget;

    this.setState({
      showOptions: true,
      inputValue: value,
      activeOption: value ? activeOption : '',
    });
  }

  handleBlurField = () => {
    const { freeSolo } = this.props;
    const { activeOption } = this.state;

    if (freeSolo) {
      this.setState({
        showOptions: false,
      });
    } else {
      this.setState({
        showOptions: false,
        inputValue: activeOption,
      });
    }
  }

  handleClickField = () => {
    const { inputValue, showOptions } = this.state;

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
      className="autocomplete_dropdown_container"
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
    const { renderOption, getOptionLabel } = this.props;
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
      className,
    } = this.props;
    const {
      showOptions,
    } = this.state;
    const filteredOptions = this.getFillteredOptions();
    const isOpen = showOptions && !!filteredOptions.length;

    return (
      <div
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

// /**
//  * Validate `validation` props
//  * @param {object} props
//  * @param {string} propName
//  * @param {string} componentName
//  * @returns {object}
//  */
// function validationPropType(props, propName, componentName, ...rest) {
//   const value = props[propName];

//   if (typeof value === 'string') {
//     const error = PropTypes.oneOf([
//       'password',
//       'fullName',
//       'email',
//       'phone',
//       'number',
//       'text',
//       'letters',
//       'date',
//       'cert',
//       'hex',
//       'base64',
//       'objectID',
//       'url',
//     ])(props, propName, componentName, ...rest);

//     if (error !== null) {
//       return error;
//     }

//     return null;
//   }

//   const error = PropTypes.func(props, propName, componentName, ...rest);

//   if (error !== null) {
//     return error;
//   }

//   return null;
// }

// export default class Autocomplete extends Component {
//   static propTypes = {
//     children: PropTypes.node,
//     /**
//      * The CSS class name of the wrapper element.
//      */
//     className: PropTypes.string,
//     /**
//      * The default input value, useful when not controlling the component.
//      */
//     defaultValue: PropTypes.oneOfType([
//       PropTypes.string,
//       PropTypes.number,
//     ]),
//     /**
//      * If true, the input will be disabled.
//      */
//     disabled: PropTypes.bool,
//     /**
//      * Callback fired when the value is changed.
//      */
//     onChange: PropTypes.func,
//     onFocus: PropTypes.func,
//     onBlur: PropTypes.func,
//     onKeyDown: PropTypes.func,
//     /**
//      * Type of the input element.
//      */
//     type: PropTypes.oneOf([
//       'text',
//       'password',
//       'email',
//       'tel',
//       'date',
//     ]),
//     /**
//      * The input value, required for a controlled component.
//      */
//     value: PropTypes.oneOfType([ // eslint-disable-line
//       PropTypes.string,
//       PropTypes.number,
//     ]),
//     /**
//      * If true, the input will be required.
//      */
//     required: PropTypes.bool,
//     /**
//      * If false, the input will be unvalid styles.
//      */
//     valid: PropTypes.bool,
//     /**
//      * The short hint displayed in the input before the user enters a value.
//      */
//     placeholder: PropTypes.string,
//     /**
//      * Color for placeholder
//      */
//     placeholderColor: PropTypes.string,
//     /**
//      * Name attribute of the input element.
//      */
//     name: PropTypes.string,
//     /**
//      * Component type one of `fill` or `stroke`.
//      * If `fill` - component will be have background-color from `color` props.
//      * If `stroke` - component will be have border-color from `color` props.
//      */
//     bgType: PropTypes.oneOf(['fill', 'stroke']),
//     /**
//      * Component color from theme
//      */
//     color: PropTypes.string,
//     /**
//      * Component text color from theme
//      */
//     textColor: PropTypes.string,
//     /**
//      * Component focus color from theme
//      */
//     colorFocus: PropTypes.string,
//     /**
//      * Component size.
//      */
//     size: PropTypes.oneOf(['medium', 'large']),
//     /**
//      * Component size for mobile.
//      */
//     mobileSize: PropTypes.oneOf(['medium', 'large']),
//     /**
//      * Properties applied to the input element.
//      */
//     inputProps: PropTypes.oneOfType([
//       PropTypes.object,
//     ]),
//     /**
//      * Array with validation types.
//      */
//     validation: PropTypes.arrayOf(validationPropType),
//     /**
//      * Component dropdown start opened direction.
//      */
//     placement: PropTypes.oneOf(['top', 'bottom']),
//     /**
//      * If `true`, component will automatically calc possible dropdown opened direction.
//      */
//     flip: PropTypes.bool,
//   }

//   static defaultProps = {
//     children: null,
//     className: '',
//     defaultValue: undefined,
//     disabled: false,
//     onChange() {},
//     onFocus() {},
//     onBlur() {},
//     onKeyDown() {},
//     type: 'text',
//     required: false,
//     valid: undefined,
//     placeholder: undefined,
//     placeholderColor: 'grey_4',
//     name: undefined,
//     bgType: 'fill',
    // color: 'light_grey',
    // textColor: 'black',
    // colorFocus: 'primary',
    // size: 'medium',
    // mobileSize: undefined,
    // inputProps: {},
    // validation: undefined,
    // placement: 'bottom',
    // flip: true,
//   }

//   state = {
//     open: false,
//     valueSelected: null,
//   };

//   componentWillUnmount() {
//     clearTimeout(this._inputBlurTimeout);
//     clearTimeout(this._inputFocusTimeout);
//     clearTimeout(this._overlayBlurTimeout);
//   }

//   _inputBlurTimeout = null;
//   _inputFocusTimeout = null;
//   _overlayBlurTimeout = null;
//   _overlayHasFocus = false;
//   _childrenValues = [];
//   textFieldNode = null;
//   _rootNode = null;

//   _onBlurInput = (e) => {
//     const { onBlur } = this.props;

//     this._inputBlurTimeout = window.setTimeout(
//       () => {
//         if (!this._overlayHasFocus) {
//           this._closeDropdown();

//           onBlur(e);
//         }
//       },
//       1,
//     );
//   }

//   _onFocusInput = (e) => {
//     const { onFocus } = this.props;

//     this._inputFocusTimeout = window.setTimeout(
//       () => { this._overlayHasFocus = false; },
//       2,
//     );

//     onFocus(e);
//   }

//   _onFocusOverlay = (e) => {
//     e.preventDefault();

//     this._overlayHasFocus = true;
//     this.textFieldNode.inputNode.inputNode.focus();
//   }

//   _onBlurOverlay = () => {
//     this._overlayBlurTimeout = window.setTimeout(
//       () => { this._overlayHasFocus = false; },
//       3,
//     );
//   }

//   _closeDropdown() {
//     const { open } = this.state;

//     if (!open) {
//       return;
//     }

//     this.setState({
//       open: false,
//     });
//   }

//   _openDropdown() {
//     const { open } = this.state;

//     if (open) {
//       return;
//     }

//     this.setState({
//       open: true,
//     });
//   }

//   _onKeyDownInput = (event) => {
//     const {
//       onKeyDown,
//       disabled,
//       name,
//     } = this.props;
//     const {
//       open,
//     } = this.state;

//     if (!disabled) {
//       const { keyCode } = event;

//       /**
//        * escape key press
//        * hide dropdown list
//        */
//       if (keyCode === 27) {
//         this._closeDropdown();
//       }

//       /**
//        * space key press
//        * hide dropdown or select element in dropdown list
//        */
//       if (keyCode === 32) {
//         event.preventDefault();
//         this._handleSpaceEnterPress(event);
//       }

//       /**
//        * enter key press
//        * hide dropdown or select element in dropdown list
//        */
//       if (keyCode === 13 && open) {
//         event.preventDefault();
//         this._handleSpaceEnterPress(event);
//       }

//       /**
//        * up key press
//        * select prev element in dropdown list
//        */
//       if (keyCode === 38) {
//         event.preventDefault();
//         this._handleItemHovered('up');
//       }

//       /**
//        * down key press
//        * select next element in dropdown list
//        */
//       if (keyCode === 40) {
//         event.preventDefault();
//         this._handleItemHovered('down');
//       }
//     }

//     onKeyDown(event, name);
//   };

//   _handleSpaceEnterPress(e) {
//     const { name, onChange } = this.props;
//     const {
//       valueSelected,
//       open,
//     } = this.state;

//     if (open && valueSelected) {
//       if (!('value' in this.props)) {
//         this.textFieldNode.inputNode.inputNode.value = valueSelected;
//         this.textFieldNode.validateField();
//       }

//       this._closeDropdown();

//       onChange(e, valueSelected, name, 'select');
//     }
//   }

//   _handleItemHovered(type) {
//     const { valueSelected, open } = this.state;
//     const { _childrenValues } = this;

//     if (!open) return;

//     if (!type) {
//       this.setState({
//         valueSelected: _childrenValues[0],
//       }, this._handleScrollToElement);

//       return;
//     }

//     const valueIndex = _childrenValues.indexOf(valueSelected);
//     const prevValue = _childrenValues[valueIndex - 1];
//     const nextValue = _childrenValues[valueIndex + 1];

//     if (type === 'up' && prevValue) {
//       this.setState({
//         valueSelected: prevValue,
//       }, this._handleScrollToElement);
//     }

//     if (type === 'down' && nextValue) {
//       this.setState({
//         valueSelected: nextValue,
//       }, this._handleScrollToElement);
//     }
//   }

//   _handleScrollToElement() {
//     if (this.dropdownNode) {
//       this.dropdownNode.scrollToFocusedElement();
//     }
//   }

//   _onClickSelectItem = child => (e) => {
//     const { onChange, name } = this.props;
//     const valueChild = child.props.value;

//     this._closeDropdown();

//     if (!('value' in this.props)) {
//       this.textFieldNode.inputNode.inputNode.value = valueChild;
//       this.textFieldNode.validateField();
//     }

//     onChange(e, valueChild, name, 'select');
//   };

//   _onChangeInput = (e) => {
//     const { onChange, name } = this.props;
//     const value = e.target.value;

//     this._openDropdown();

//     onChange(e, value, name);
//   }

//   render() {
//     const {
//       className,
//       defaultValue,
//       disabled,
//       onChange,
//       onFocus,
//       onBlur,
//       type,
//       value,
//       required,
//       valid,
//       placeholder,
//       name,
//       bgType,
//       color,
//       textColor,
//       colorFocus,
//       size,
//       mobileSize,
//       inputProps,
//       children,
//       validation,
//       placeholderColor,
//       placement,
//       flip,
//       ...other
//     } = this.props;
//     const {
//       open,
//       valueSelected,
//     } = this.state;

//     this._childrenValues = [];

//     const options = Children.map(children, (child) => {
//       if (!isValidElement(child)) {
//         return null;
//       }

//       const {
//         value: valueChild,
//         disabled: disabledChild,
//       } = child.props;
//       const selected = false;

//       if (!disabledChild) {
//         this._childrenValues.push(valueChild);
//       }

//       return cloneElement(child, {
//         onClick: disabledChild ? null : this._onClickSelectItem(child),
//         selected,
//         hasFocus: valueSelected === valueChild,
//         size,
//         textColor,
//         colorFocus,
//       });
//     });
//     const mustOpen = open && options && options.length > 0;
//     const dropdownBody = (dropDownProps) => {
//       this._rootNode.setAttribute('data-placement', dropDownProps.placement);

      // return (
      //   <div
      //     ref={dropDownProps.ref}
      //     style={{
      //       top: 0,
      //       left: 0,
      //       position: dropDownProps.style.position,
      //       transform: `translate3d(0px, ${dropDownProps.style.top}px, 0px)`,
      //       transformOrigin: 'top center',
      //     }}
      //     className="autocomplete_dropdown_container"
      //   >
      //     <SelectDropdown
      //       className="autocomplete_dropdown"
      //       bgType={bgType}
      //       color={color}
      //       colorFocus={colorFocus}
      //       ref={(node) => { this.dropdownNode = node; }}
      //       tabIndex={0}
      //       onFocus={this._onFocusOverlay}
      //       onBlur={this._onBlurOverlay}
      //     >
      //       {options}
      //     </SelectDropdown>
      //   </div>
      // );
//     };

//     return (
//       <div
//         data-component="autocomplete"
//         data-open={mustOpen}
//         data-disabled={disabled}
//         className={classnames(
//           'autocomplete',
//           className,
//         )}
//         {...other}
//         ref={(node) => { this._rootNode = node; }}
//       >
//         <TextField
//           placeholder={placeholder}
//           onBlur={this._onBlurInput}
//           onFocus={this._onFocusInput}
//           onChange={this._onChangeInput}
//           onKeyDown={this._onKeyDownInput}
//           size={size}
//           mobileSize={mobileSize}
//           textColor={textColor}
//           colorFocus={colorFocus}
//           bgType={bgType}
//           color={color}
//           ref={(node) => { this.textFieldNode = node; }}
//           defaultValue={defaultValue}
//           value={value}
//           disabled={disabled}
//           type={type}
//           required={required}
//           valid={valid}
//           name={name}
//           inputProps={inputProps}
//           autoComplete="off"
//           validation={validation}
//         />
//         {mustOpen && (
          // <Popper
          //   modifiers={{
          //     computeStyle: {
          //       gpuAcceleration: false,
          //     },
          //     preventOverflow: {
          //       enabled: false,
          //     },
          //     hide: {
          //       enabled: false,
          //     },
          //     flip: {
          //       enabled: flip,
          //     },
          //   }}
          //   positionFixed={false}
          //   referenceElement={this._rootNode}
          //   placement={placement}
          // >
          //   {dropdownBody}
          // </Popper>
//         )}
//       </div>
//     );
//   }
// }
