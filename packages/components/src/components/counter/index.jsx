import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withAnalytics from '../../containers/analytics_hoc';
import Input from '../text_field/input';
import CounterTriangleIcon from '../icons/counter_arrow';

function prepareValue(value, defaultValue) {
  if (value || typeof value === 'number') {
    return value;
  }

  if (defaultValue || typeof defaultValue === 'number') {
    return defaultValue;
  }

  return '';
}

class Counter extends React.Component {
  static propTypes = {
    /**
     * The input value, required for a controlled component.
     */
    value: PropTypes.number,
    /**
     * The default input value, useful when not controlling the component.
     */
    defaultValue: PropTypes.number,
    /**
     * Maximum input value
     */
    minValue: PropTypes.number,
    /**
     * Minimum input value
     */
    maxValue: PropTypes.number,
    /**
     * Callback fired when the value is changed.
     */
    onChange: PropTypes.func,
    /**
     * Placeholder that will show if current value equal to minimum value
     */
    minValuePlaceholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * Placeholder that will show if current value equal to maximum value
     */
    maxValuePlaceholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * If true, the input will be disabled.
     */
    disabled: PropTypes.bool,
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
     * Component text color from theme
     */
    textColor: PropTypes.string,
    /**
     * Component focus color from theme
     */
    colorFocus: PropTypes.string,
    /**
     * Properties applied to the input element.
     */
    inputProps: PropTypes.oneOfType([
      PropTypes.object,
    ]),
    /**
     * Additional custom properties applied to the component.
     */
    counterProps: PropTypes.oneOfType([
      PropTypes.object,
    ]),
  }

  static defaultProps = {
    value: undefined,
    defaultValue: 0,
    minValue: undefined,
    maxValue: undefined,
    onChange() {},
    minValuePlaceholder: undefined,
    maxValuePlaceholder: undefined,
    disabled: false,
    bgType: 'fill',
    color: 'light_grey',
    textColor: 'black',
    inputProps: {},
    counterProps: {},
    colorFocus: 'primary',
  };

  constructor(props) {
    super(props);

    const { value, defaultValue } = props;

    this.state = {
      value: prepareValue(value, defaultValue),
    };
  }

  onKeyDown = (e) => {
    if (e.keyCode === 38) {
      e.preventDefault();
      this.onChange(1);
    }

    if (e.keyCode === 40) {
      e.preventDefault();
      this.onChange(-1);
    }
  }

  onChange(add) {
    const { minValue, maxValue, onChange } = this.props;
    const { value } = this.state;
    const newSize = value + add;

    if (minValue <= newSize && newSize <= maxValue) {
      this.setState({ value: newSize });
      onChange(newSize);

      return;
    }

    if (newSize < minValue) {
      this.setState({ value: maxValue });
      onChange(newSize);

      return;
    }

    this.setState({ value: minValue });
    onChange(newSize);
  }

  render() {
    const { value } = this.state;
    const {
      bgType,
      color,
      textColor,
      colorFocus,
      minValue,
      minValuePlaceholder,
      maxValue,
      maxValuePlaceholder,
      disabled,
      inputProps,
      counterProps,
    } = this.props;

    let inputValue = value;

    if (minValue === value && minValuePlaceholder) {
      inputValue = minValuePlaceholder;
    }

    if (maxValue === value && maxValuePlaceholder) {
      inputValue = maxValuePlaceholder;
    }

    return (
      <Input
        bgType={bgType}
        color={color}
        textColor={textColor}
        colorFocus={colorFocus}
        value={inputValue}
        disabled={disabled}
        onKeyDown={this.onKeyDown}
        onClick={() => this.onChange(1)}
        name="counter"
        inputProps={{
          readOnly: true,
          className: classNames(
            'counter',
            inputProps.className,
          ),
          ...inputProps,
        }}
        {...counterProps}
      >
        <button
          className="counter_button"
          data-id="increase-triangle"
          tabIndex="-1"
          onClick={() => this.onChange(1)}
        >
          <span>
            <CounterTriangleIcon className="counter_triangle" />
          </span>
        </button>
        <button
          className="counter_button"
          data-id="decrease-triangle"
          tabIndex="-1"
          onClick={(e) => {
            e.stopPropagation();
            this.onChange(-1);
          }}
        >
          <span>
            <CounterTriangleIcon className="counter_triangle" />
          </span>
        </button>
      </Input>
    );
  }
}

export default withAnalytics(Counter, 'onChange');
