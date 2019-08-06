import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withAnalytics from '../../containers/analytics_hoc';

/**
 * Verifies min/max range.
 * @param {object} props
 * @param {string} propName
 * @param {string} componentName
 * @returns {object}
 */
function minMaxPropType(props, propName, componentName, ...rest) {
  const error = PropTypes.number(props, propName, componentName, ...rest);

  if (error !== null) {
    return error;
  }

  if (props.min >= props.max) {
    const errorMsg = (propName === 'min') ? 'min should be less than max' : 'max should be greater than min';

    return new Error(errorMsg);
  }

  return null;
}

/**
 * Verifies value is within the min/max range.
 * @param {object} props
 * @param {string} propName
 * @param {string} componentName
 * @returns {object}
 */
function valueInRangePropType(props, propName, componentName, ...rest) {
  const error = PropTypes.number(props, propName, componentName, ...rest);

  if (error !== null) {
    return error;
  }

  const value = props[propName];

  if (value < props.min || props.max < value) {
    return new Error(`${propName} should be within the range specified by min and max`);
  }

  return null;
}

/**
 * Slider component
 */
class Slider extends PureComponent {
  static propTypes = {
    /**
     * The default value of the slider
     */
    defaultValue: valueInRangePropType,
    /**
     * If true, the slider will not be interactable
     */
    disabled: PropTypes.bool,
    /**
     * The maximum value the slider can slide to on a scale from 0 to 1 inclusive.
     * Cannot be equal to min
     */
    max: minMaxPropType,
    /**
     * The minimum value the slider can slide to on a scale from 0 to 1 inclusive.
     * Cannot be equal to max
     */
    min: minMaxPropType,
    /**
     * The name of the slider. Behaves like the name attribute of an input element
     */
    name: PropTypes.string,
    /**
     * Callback function that is fired when the slider's value changed
     */
    onChange: PropTypes.func,
    /**
     * Callback function that is fired when the slider has begun to move
     */
    onDragStart: PropTypes.func,
    /**
     * Callback function that is fired when the slider has stopped moving
     */
    onDragStop: PropTypes.func,
    /**
     * Callback function that is fired when the slider mouse down
     */
    onMouseDown: PropTypes.func,
    /**
     * Callback function that is fired when the slider touch start
     */
    onTouchStart: PropTypes.func,
    /**
     * Whether or not the slider is required in a form
     */
    required: PropTypes.bool,
    /**
     * The granularity the slider can step through values
     */
    step: PropTypes.number,
    /**
     * The value of the slider
     */
    value: valueInRangePropType,
    /**
     * The css class name of the root element
     */
    className: PropTypes.string,
    /**
     * The tabIndex attribute for slider
     */
    tabIndex: PropTypes.number,
    /**
     * Component color from theme
     */
    color: PropTypes.string,
    /**
     * Component icon color from theme
     */
    iconColor: PropTypes.string,
    /**
     * Component progress color from theme
     */
    progressColor: PropTypes.string,
    /**
     * Properties for `<input type="hidden" />` element
     */
    inputProps: PropTypes.oneOfType([
      PropTypes.object,
    ]),
  };

  static defaultProps = {
    defaultValue: 0,
    disabled: false,
    max: 1,
    min: 0,
    name: undefined,
    onChange() {},
    onDragStart() {},
    onDragStop() {},
    onMouseDown() {},
    onTouchStart() {},
    required: false,
    step: 0.01,
    value: undefined,
    className: '',
    tabIndex: 0,
    color: 'light_grey',
    iconColor: 'primary',
    progressColor: '',
    inputProps: {},
  };

  state = {
    dragging: false,
    value: 0,
  };

  componentWillMount() {
    const {
      value,
      defaultValue,
      min,
    } = this.props;

    let _value = value;

    if (_value === undefined) {
      _value = defaultValue !== undefined ? defaultValue : min;
    }

    this.setState({
      value: this.resolveValue(_value),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dragging } = this.state;

    if (nextProps.value !== undefined && !dragging) {
      this.setState({
        value: this.resolveValue(nextProps.value),
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleDragMouseMove);
    document.removeEventListener('mouseup', this.handleMouseEnd);

    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchup', this.handleTouchEnd);
    document.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('touchcancel', this.handleTouchEnd);
  }

  /**
   * Handler onDragStart
   * @param {SynteticEvent} event
   */
  onDragStart(event) {
    const { onDragStart } = this.props;

    this.setState({
      dragging: true,
    });

    if (onDragStart) {
      onDragStart(event);
    }
  }

  /**
   * Handler onDragUpdate
   * @param {SynteticEvent} event
   * @param {string} type
   */
  onDragUpdate(event, type) {
    const { disabled } = this.props;

    if (this.dragRunning) {
      return;
    }

    this.dragRunning = true;

    requestAnimationFrame(() => {
      this.dragRunning = false;
      const source = type === 'touch' ? event.touches[0] : event;
      const position = source.clientX - this.getTrackOffset();

      if (!disabled) {
        this.setValueFromPosition(event, position);
      }
    });
  }

  /**
   * Handler onDragStop
   * @param {SynteticEvent} event
   */
  onDragStop(event) {
    const { onDragStop } = this.props;

    this.setState({
      dragging: false,
    });

    if (onDragStop) {
      onDragStop(event);
    }
  }

  /**
   * Calculate percent from value
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  static getPercent(value, min, max) {
    let percent = (value - min) / (max - min);

    if (isNaN(percent)) {
      percent = 0;
    }

    return percent;
  }

  /**
   * Get track offset left
   * @returns {Number}
   */
  getTrackOffset() {
    return this.trackNode.getBoundingClientRect().left;
  }

  /**
   * Prepare position value and set to state value
   * @param {SynteticEvent} event
   * @param {number} position
   */
  setValueFromPosition(event, position) {
    const {
      step,
      min,
      max,
      onChange,
    } = this.props;

    const positionMax = this.trackNode.clientWidth;

    let value;

    if (position <= 0) {
      value = min;
    } else if (position >= positionMax) {
      value = max;
    } else {
      value = (position / positionMax) * (max - min) + min;
      value = Math.round(value / step) * step;
      value = parseFloat(value.toFixed(5));
    }

    value = this.resolveValue(value);

    if (this.state.value !== value) {
      this.setState({
        value,
      });

      if (onChange) {
        onChange(event, value);
      }
    }
  }

  trackNode = null;
  dragRunning = false;

  /**
   * Compare value with min/max props
   * @param {number} value
   * @returns {number}
   */
  resolveValue(value) {
    const { max, min } = this.props;

    if (value > max) {
      return max;
    }

    if (value < min) {
      return min;
    }

    return value;
  }

  /**
   * Handler onMouseDown
   * @param {SynteticEvent} event
   */
  handleMouseDown = (event) => {
    const { disabled, onMouseDown } = this.props;

    if (disabled) {
      return;
    }

    const position = event.clientX - this.getTrackOffset();

    this.setValueFromPosition(event, position);

    document.addEventListener('mousemove', this.handleDragMouseMove);
    document.addEventListener('mouseup', this.handleMouseEnd);

    this.onDragStart(event);

    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  /**
   * Handler onDragMouseMove
   * @param {SynteticEvent} event
   */
  handleDragMouseMove = (event) => {
    this.onDragUpdate(event, 'mouse');
  };

  /**
   * Handler onMouseEnd
   * @param {SynteticEvent} event
   */
  handleMouseEnd = (event) => {
    document.removeEventListener('mousemove', this.handleDragMouseMove);
    document.removeEventListener('mouseup', this.handleMouseEnd);

    this.onDragStop(event);
  };

  /**
   * Handler onTouchStart
   * @param {SynteticEvent} event
   */
  handleTouchStart = (event) => {
    const { disabled, onTouchStart } = this.props;

    if (disabled) {
      return;
    }

    const position = event.touches[0].clientX - this.getTrackOffset();

    this.setValueFromPosition(event, position);

    document.addEventListener('touchmove', this.handleTouchMove);
    document.addEventListener('touchup', this.handleTouchEnd);
    document.addEventListener('touchend', this.handleTouchEnd);
    document.addEventListener('touchcancel', this.handleTouchEnd);

    this.onDragStart(event);

    // Cancel scroll and context menu
    event.preventDefault();

    if (onTouchStart) {
      onTouchStart(event);
    }
  };

  /**
   * Handler onTouchMove
   * @param {SynteticEvent} event
   */
  handleTouchMove = (event) => {
    this.onDragUpdate(event, 'touch');
  };

  /**
   * Handler onTouchEnd
   * @param {SynteticEvent} event
   */
  handleTouchEnd = (event) => {
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchup', this.handleTouchEnd);
    document.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('touchcancel', this.handleTouchEnd);

    this.onDragStop(event);
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      defaultValue,
      disabled,
      max,
      min,
      name,
      onChange,
      onDragStart,
      onDragStop,
      onMouseDown,
      onTouchStart,
      required,
      step,
      value: valueProp,
      className,
      tabIndex,
      color,
      iconColor,
      progressColor,
      inputProps,
      ...other
    } = this.props;
    const { value } = this.state;
    const percent = Slider.getPercent(value, min, max) * 100;

    return (
      <div
        data-component="slider"
        data-disabled={disabled}
        tabIndex={tabIndex}
        className={classNames(
          'slider',
          className,
        )}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        {...other}
      >
        <div
          ref={(node) => { this.trackNode = node; }}
          className={classNames(
            'slider_track',
            [`fill_${color}`],
          )}
        />
        <div
          className={classNames(
            'slider_progress',
            [`fill_${progressColor || color}`],
          )}
          style={{
            width: `${percent}%`,
          }}
          data-component="slider-progress"
        />
        <div
          className={classNames(
            'slider_tab',
            [`fill_${iconColor}`],
          )}
          style={{
            left: `${percent}%`,
          }}
        />
        <input
          {...inputProps}
          type="hidden"
          name={name}
          value={value}
          required={required}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
      </div>
    );
  }
}

export default withAnalytics(Slider, 'onDragStop');
