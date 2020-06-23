import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withAnalytics from '../../containers/analytics_hoc';
import Typography from '../typography';

/**
 * Radio component
 */
class Radio extends PureComponent {
  static propTypes = {
    /**
     * If true, the component is checked
     */
    checked: PropTypes.bool,
    /**
     * If true, the component will be disabled
     */
    disabled: PropTypes.bool,
    /**
     * Name attribute for component
     */
    name: PropTypes.string,
    /**
     * The value of the component
     */
    value: PropTypes.string,
    /**
     * Callback fired when the state is changed
     */
    onChange: PropTypes.func,
    /**
     * Properties for `<input type="radio" />` element
     */
    inputProps: PropTypes.oneOfType([
      PropTypes.object,
    ]),
    /**
     * Label for radio
     */
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * Where the label will be placed next to the radio
     */
    labelPosition: PropTypes.oneOf(['left', 'right']),
    /**
     * `Typography` props for label
     */
    labelProps: PropTypes.object, // eslint-disable-line
    /**
     * The CSS class name of the root element
     */
    className: PropTypes.string,
    /**
     * The tabIndex of the root element
     */
    tabIndex: PropTypes.number,
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
     * Component checked color from theme
     */
    colorOn: PropTypes.string,
    /**
     * Component icon color from theme
     */
    iconColor: PropTypes.string,
    /**
     * Component checked icon color from theme
     */
    iconColorOn: PropTypes.string,
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    name: undefined,
    value: undefined,
    onChange() {},
    inputProps: {},
    label: undefined,
    labelPosition: 'left',
    labelProps: {},
    className: '',
    tabIndex: 0,
    bgType: 'fill',
    color: 'light_grey',
    colorOn: 'primary',
    iconColor: 'grey',
    iconColorOn: 'white',
  };

  /**
   * onChange handler
   * @param {SytheticEvent} e
   */
  onChange = (e) => {
    const { onChange } = this.props;

    onChange(e, e.target.value);
  };

  /**
   * onKeyUp handler
   * @param {SytheticEvent} e
   */
  onKeyUp = (e) => {
    const keyCode = e.keyCode;

    if (keyCode === 13) {
      this.onChange(e);
    }
  };

  /**
   * renderLabel
   * @return {ReactElement} markup
   */
  renderLabel() {
    const { label, labelPosition, labelProps } = this.props;

    return label && (
      <Typography
        type="b2"
        color="black"
        className="radio_label"
        data-position={labelPosition}
        {...labelProps}
      >
        {label}
      </Typography>
    );
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      checked,
      disabled,
      name,
      value,
      onChange,
      inputProps,
      label,
      labelPosition,
      labelProps,
      className,
      tabIndex,
      bgType,
      color,
      colorOn,
      iconColor,
      iconColorOn,
      ...other
    } = this.props;

    return (
      <div
        data-component="radio"
        data-type={bgType}
        data-checked={checked}
        data-disabled={disabled}
        className={classNames(
          'radio',
          className,
        )}
        {...other}
      >
        <input
          {...inputProps}
          tabIndex={tabIndex}
          type="radio"
          name={name}
          value={value}
          className="radio_input"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          disabled={disabled}
          checked={checked}
        />
        {labelPosition === 'left' ? this.renderLabel() : null}
        <div
          className={classNames(
            'radio_container',
            {
              [`stroke_${colorOn}`]: checked,
              [`fill_${colorOn}`]: checked,
            },
            {
              [`stroke_${color}`]: !checked,
              [`fill_${color}`]: !checked,
            },
          )}
          data-component="radio_container"
        >
          <div
            className={classNames(
              'radio_tumbler',
              {
                [`fill_${iconColor}`]: !checked,
              },
              {
                [`fill_${iconColorOn}`]: checked,
              },
            )}
          />
        </div>
        {labelPosition === 'right' ? this.renderLabel() : null}
      </div>
    );
  }
}

export default withAnalytics(Radio, 'onChange');
