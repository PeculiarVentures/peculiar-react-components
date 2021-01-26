import * as React from 'react';
import classnames from 'classnames';
import { Popper } from 'react-popper';
import * as Flags from 'country-flag-icons/react/3x2';
import SelectDropdown from '../select/select_dropdown';
import SelectItem from '../select/select_item';
import TextField from '../text_field';
import SelectArrowIcon from '../icons/select_arrow';
import { countries, formatNumber } from './utils';

export default class PhoneField extends React.Component {
  constructor(props) {
    super(props);

    const defaultCountry = countries.find(c => c.iso2 === 'UA');

    this.state = {
      showOptions: false,
      activeOption: defaultCountry,
      inputValue: defaultCountry.dialCode,
    };
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

  handleChangeField = (event) => {
    const { activeOption, inputValue } = this.state;
    const { dialCode } = activeOption;
    const { value } = event.currentTarget;

    if (!value.length) {
      this.setState({
        inputValue: dialCode,
      });

      return;
    }

    if (value.slice(0, dialCode.length) !== dialCode) {
      return;
    }

    const inputNumber = value.replace(/\D/g, '');
    const formattedNumber = formatNumber(inputNumber, activeOption);
    let caretPosition = event.target.selectionStart;
    const diff = formattedNumber.length - inputValue.length;

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
  }

  handleBlurField = () => {
    this.setState({
      showOptions: false,
    });
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

          if (this._refSelectDropdown && this._refSelectDropdown.current) {
            this._refSelectDropdown.current.focusOption('prev');
          }

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

          if (this._refSelectDropdown && this._refSelectDropdown.current) {
            this._refSelectDropdown.current.focusOption();
          }

          break;
        }

        case 'Enter': {
          if (this._refSelectDropdown && this._refSelectDropdown.current) {
            event.preventDefault();

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

  handleClickOption = option => () => {
    this.setState({
      activeOption: option,
      showOptions: false,
      inputValue: option.dialCode,
    });
  }

  handleClickSelect = () => {
    const { showOptions } = this.state;

    this.setState({
      showOptions: !showOptions,
    });

    this.refTextField.current.focus();
  }

  renderOpenButton() {
    const {
      activeOption,
      showOptions,
    } = this.state;
    const Icon = Flags[activeOption.iso2];

    return (
      <button
        onClick={this.handleClickSelect}
        tabIndex={-1}
        type="button"
        className={classnames(
          'phone_field_button_country',
          {
            phone_field_button_country_open: showOptions,
          },
        )}
        onMouseDown={(event) => {
          // Prevent blur
          event.preventDefault();
        }}
        aria-hidden
      >
        <Icon
          className="phone_field_icon_country"
        />
        <SelectArrowIcon
          className="phone_field_icon_arrow"
        />
      </button>
    );
  }

  renderOptions() {
    const { activeOption } = this.state;

    return countries.map((option, index) => {
      const Icon = Flags[option.iso2];

      if (!Icon) {
        return null;
      }

      return (
        <SelectItem
          key={option.iso2}
          value={option.iso2}
          data-option-index={index}
          onClick={this.handleClickOption(option)}
          selected={activeOption.iso2 === option.iso2}
        >
          <Icon
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
        onMouseDown={(event) => {
          // Prevent blur
          event.preventDefault();
        }}
      >
        {this.renderOptions()}
      </SelectDropdown>
    </div>
  );

  renderPopup() {
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
            enabled: true,
          },
        }}
        positionFixed={false}
        referenceElement={this._refRootElement ? this._refRootElement.current : null}
        placement="bottom"
      >
        {this.renderDropDown()}
      </Popper>
    );
  }

  renderField() {
    const { inputValue } = this.state;

    return (
      <TextField
        type="tel"
        autoComplete="off"
        bgType="stroke"
        color="light_grey"
        textColor="black"
        placeholderColor="grey_4"
        colorFocus="primary"
        className="phone_field_field"
        value={inputValue}
        onChange={this.handleChangeField}
        onBlur={this.handleBlurField}
        onKeyDown={this.handleKeyDownField}
        ref={this.refTextField}
      >
        {this.renderOpenButton()}
      </TextField>
    );
  }

  render() {
    const { showOptions } = this.state;

    return (
      <div
        ref={this._refRootElement}
        className="phone_field"
      >
        {this.renderField()}
        {showOptions && this.renderPopup()}
      </div>
    );
  }
}
