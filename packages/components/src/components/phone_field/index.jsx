import * as React from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
import { Popper } from 'react-popper';
import * as Flags from 'country-flag-icons/react/3x2';
import {
  getCountries,
  getCountryCallingCode,
  AsYouType,
} from 'libphonenumber-js';
import countries from './en.js';
import SelectDropdown from '../select/select_dropdown';
import SelectItem from '../select/select_item';
import TextField from '../text_field';
import SelectArrowIcon from '../icons/select_arrow';

export default class PhoneField extends React.Component {
  state = {
    showOptions: false,
    activeOption: 'UA',
    inputValue: `+${getCountryCallingCode('UA')}`,
  };

  supportedCountries = getCountries();
  _refRootElement = React.createRef();

  handleChangeField = (event) => {
    const { activeOption } = this.state;
    const callingCode = getCountryCallingCode(activeOption);
    const { value } = event.currentTarget;
    const replaced = value.replace(/\D/g, '');
    const callingCodeFromValue = replaced.slice(0, callingCode.length);

    if (callingCode === callingCodeFromValue) {
      const formatter = new AsYouType(activeOption);

      formatter.input(`+${replaced}`);

      const phoneNumber = formatter.getNumber();

      if (phoneNumber) {
        console.log(phoneNumber.formatInternational());
        this.setState({
          inputValue: phoneNumber.formatInternational(),
        });
      } else {
        this.setState({
          inputValue: `+${replaced}`,
        });
      }
    }
  }

  handleClickOption = option => () => {
    this.setState({
      activeOption: option,
      showOptions: false,
      inputValue: `+${getCountryCallingCode(option)}`,
    });
  }

  renderOpenButton() {
    const {
      showOptions,
      activeOption,
    } = this.state;
    const Icon = Flags[activeOption];

    return (
      <button
        onClick={() => {
          this.setState({
            showOptions: !showOptions,
          });
        }}
        tabIndex={-1}
        type="button"
        className="phone_field_button_country"
        // onMouseDown={(event) => {
        //   // Prevent blur
        //   event.preventDefault();
        // }}
      >
        <Icon
          className="phone_field_icon_country"
        />
        <SelectArrowIcon
          className="select_arrow_icon"
        />
      </button>
    );
  }

  renderOptions() {
    const { activeOption } = this.state;

    return this.supportedCountries.map((option, index) => {
      const Icon = Flags[option];

      if (!Icon) {
        return null;
      }

      return (
        <SelectItem
          key={option}
          data-option-index={index}
          value={option}
          onClick={this.handleClickOption(option)}
          selected={activeOption === option}
        >
          <Icon
            className="phone_field_icon_country"
          />
          {countries[option]} +{getCountryCallingCode(option)}
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
        autoComplete="off"
        bgType="stroke"
        color="light_grey"
        textColor="black"
        placeholderColor="grey_4"
        colorFocus="primary"
        className="phone_field_field"
        value={inputValue}
        onChange={this.handleChangeField}
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
