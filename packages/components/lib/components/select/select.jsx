import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SelectDropdown from './select_dropdown';
import withAnalytics from '../../containers/analytics_hoc';
import SelectArrowIcon from '../icons/select_arrow';

function prepareValue(value, defaultValue) {
  if (value || typeof value === 'number') {
    return value;
  }

  if (defaultValue || typeof defaultValue === 'number') {
    return defaultValue;
  }

  return '';
}

/**
 * Select component
 */
class Select extends Component {
  static propTypes = {
    /**
     * The option elements to populate the select with.
     */
    children: PropTypes.node.isRequired,
    /**
     * If true, the component will be using a native select element.
     */
    native: PropTypes.bool,
    /**
     * The input/select name value.
     */
    name: PropTypes.string,
    /**
     * If true, the select will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * The input/select value.
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * The input/select default value.
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * Callback function fired when a menu item is selected.
     */
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    /**
     * Element tabIndex.
     */
    tabIndex: PropTypes.number,
    /**
     * Classname for the root element.
     */
    className: PropTypes.string,
    /**
     * The short hint displayed in the input before
     * the user enters a value (only for `native: false`)
     */
    placeholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * Color for placeholder
     */
    placeholderColor: PropTypes.string,
    /**
     * Properties applied to the input/select element.
     */
    inputProps: PropTypes.oneOfType([
      PropTypes.object,
    ]),
    arrowComponent: PropTypes.node,
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
     * Select dropdown opened place
     */
    placement: PropTypes.oneOf(['top', 'bottom']),
  };

  static contextTypes = {
    device: PropTypes.object,
  };

  static defaultProps = {
    native: false,
    name: undefined,
    disabled: false,
    value: undefined,
    defaultValue: undefined,
    onChange() {},
    onFocus() {},
    onBlur() {},
    onKeyDown() {},
    tabIndex: 0,
    className: '',
    placeholder: undefined,
    placeholderColor: 'grey_4',
    inputProps: {},
    arrowComponent: null,
    bgType: 'fill',
    color: 'light_grey',
    textColor: 'black',
    colorFocus: 'primary',
    size: 'medium',
    mobileSize: undefined,
    placement: 'bottom',
  };

  state = {
    open: false,
    value: prepareValue(this.props.value, this.props.defaultValue),
    valueSelected: null,
  };

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this._blurTimeout);
  }

  /**
   * Get select value
   * @return {string|number}
   */
  getValue = () => (
    this.inputNode.value
  );

  /**
   * Set select value
   * @param {string|number} value
   */
  setValue = value => (
    this.setState({
      value,
    })
  )

  _blurTimeout = null;
  _childrenValues = [];
  inputNode = null;
  dropdownNode = null;

  /**
   * onClick select item handler
   * @param {object} child
   */
  _handleItemClick = child => (e) => {
    const { onChange, name, value } = this.props;
    const valueChild = child.props.value;

    if (value || value === valueChild) {
      this.setState({
        open: false,
      });

      if (value === valueChild) return;
    } else {
      this.setState({
        value: valueChild,
        open: false,
      });
    }

    onChange(e, valueChild, name);
  };

  /**
   * onClick select handler
   */
  _handleClick = () => {
    const { disabled } = this.props;
    const { open } = this.state;

    if (disabled) return;

    if (open) {
      this.setState({
        open: false,
      });
    } else {
      this.setState({
        open: true,
      }, this._handleItemHovered);
    }
  };

  /**
   * onFocus select handler
   * @param {SytheticEvent} e
   */
  _handleFocus = (e) => {
    const { onFocus, name } = this.props;

    clearTimeout(this._blurTimeout);
    onFocus(e, name);
  };

  /**
   * onBlur select handler
   * @param {SytheticEvent} e
   */
  _handleBlur = (e) => {
    const { onBlur, name } = this.props;

    clearTimeout(this._blurTimeout);
    this._blurTimeout = setTimeout(this.setState.bind(this, { open: false }), 0);
    onBlur(e, name);
  };

  /**
   * onSpaceEnterPress select handler
   * @param {SytheticEvent} e
   */
  _handleSpaceEnterPress(e) {
    const { value, name, onChange } = this.props;
    const {
      valueSelected,
      open,
    } = this.state;

    if (open && valueSelected && !value) {
      this.setState({
        value: valueSelected,
      });
    }

    if (open && valueSelected) {
      onChange(e, valueSelected, name);
    }

    this._handleClick();
  }

  /**
   * onKeyDown select handler
   * @param {SytheticEvent} e
   */
  _handleKeyDown = (event) => {
    const {
      onKeyDown,
      disabled,
      name,
    } = this.props;

    if (!disabled) {
      const { keyCode } = event;

      /**
       * escape key press
       * hide dropdown list
       */
      if (keyCode === 27) {
        this.setState({
          open: false,
        });
      }

      /**
       * space or enter key press
       * open/hide dropdown or select element in dropdown list
       */
      if (keyCode === 32 || keyCode === 13) {
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

  /**
   * onSelectItemFocus handler
   * @param {string|undefined} type
   */
  _handleItemHovered(type) {
    const { valueSelected, open, value } = this.state;
    const { _childrenValues } = this;

    if (!open) return;

    if (!type) {
      if (value) {
        this.setState({
          valueSelected: value,
        }, this._handleScrollToElement);
      } else {
        this.setState({
          valueSelected: _childrenValues[0],
        }, this._handleScrollToElement);
      }

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

  /**
   * Scroll to focused element
   */
  _handleScrollToElement() {
    if (this.dropdownNode) {
      this.dropdownNode.scrollToFocusedElement();
    }
  }

  /**
   * Render open button
   * @return {ReactElement} markup
   */
  _renderOpenButton() {
    const { arrowComponent } = this.props;

    return (
      <div className="select_open_button">
        {arrowComponent || <SelectArrowIcon className="select_arrow_icon" />}
      </div>
    );
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      native,
      children,
      name,
      disabled,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      multiple, // eslint-disable-line
      tabIndex,
      className,
      placeholder,
      inputProps,
      arrowComponent,
      bgType,
      color,
      textColor,
      colorFocus,
      size: propsSize,
      mobileSize,
      placement,
      placeholderColor,
      ...other
    } = this.props;
    const {
      open,
      value: valueState,
      valueSelected,
    } = this.state;
    const { device } = this.context;

    let size = propsSize || Select.defaultProps.size;

    if (device && mobileSize) {
      if (device.type === 'mobile') {
        size = mobileSize;
      }
    }

    if (native) {
      return (
        <div
          data-component="select"
          data-type={bgType}
          data-disabled={disabled}
          className={classNames(
            'select',
            className,
          )}
          {...other}
        >
          <select
            data-component="select_field"
            {...inputProps}
            tabIndex={tabIndex}
            multiple={false}
            className={classNames(
              'select_field',
              'round_small',
              [`select_field_${size}`],
              [`select_field_focus_${colorFocus}`],
              [`stroke_${color}`],
              {
                [`fill_${color}`]: bgType === 'fill',
                fill_white: bgType === 'stroke',
              },
            )}
            name={name}
            disabled={disabled}
            ref={(node) => { this.inputNode = node; }}
            value={value}
            defaultValue={defaultValue}
            onChange={(e) => { onChange(e, e.target.value, name); }}
            onFocus={(e) => { onFocus(e, name); }}
            onBlur={(e) => { onBlur(e, name); }}
            onKeyDown={(e) => { onKeyDown(e, name); }}
          >
            {children}
          </select>
          {this._renderOpenButton()}
        </div>
      );
    }

    this._childrenValues = [];
    let displayValue = placeholder;

    const options = Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return null;
      }

      const {
        value: valueChild,
        children: childrenChild,
        disabled: disabledChild,
      } = child.props;
      const selected = valueState === valueChild;

      if (selected) {
        displayValue = childrenChild;
      }

      if (!disabledChild) {
        this._childrenValues.push(valueChild);
      }

      return cloneElement(child, {
        onClick: disabledChild ? null : this._handleItemClick(child),
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
        data-component="select"
        data-type={bgType}
        data-disabled={disabled}
        data-open={mustOpen}
        data-placement={placement}
        className={classNames(
          'select',
          className,
        )}
        onFocus={this._handleFocus}
        onBlur={this._handleBlur}
        onKeyDown={this._handleKeyDown}
        {...other}
        {...Object.assign(disabled ? {} : {
          tabIndex,
        })}
      >
        <div
          data-component="select_field"
          className={classNames(
            'select_field',
            'truncate_text',
            'round_small',
            [`select_field_${size}`],
            [`select_field_focus_${colorFocus}`],
            [`stroke_${color}`],
            {
              [`fill_${color}`]: bgType === 'fill',
              fill_white: bgType === 'stroke',
            },
          )}
          onClick={this._handleClick}
        >
          <span
            className={classNames({
              [`text_${textColor}`]: valueState,
              [`text_${placeholderColor}`]: !valueState,
            })}
          >
            {displayValue}
          </span>
        </div>
        <input
          {...inputProps}
          type="hidden"
          value={valueState}
          name={name}
          ref={(node) => { this.inputNode = node; }}
          disabled={disabled}
        />
        {this._renderOpenButton()}
        {(options && options.length > 0) && (
          <SelectDropdown
            className="select_dropdown"
            ref={(node) => { this.dropdownNode = node; }}
            bgType={bgType}
            color={color}
            colorFocus={colorFocus}
          >
            {options}
          </SelectDropdown>
        )}
      </div>
    );
  }
}

export default withAnalytics(Select, 'onChange');
