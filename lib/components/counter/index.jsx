import React from 'react';
import PropTypes from 'prop-types';
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
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    onChange: PropTypes.func,
    minValuePlaceholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    maxValuePlaceholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    disabled: PropTypes.bool,
    bgType: PropTypes.oneOf(['fill', 'stroke']),
    color: PropTypes.string,
    textColor: PropTypes.string,
    colorFocus: PropTypes.string,
    inputProps: PropTypes.oneOfType([
      PropTypes.object,
    ]),
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
          className: 'counter',
          ...inputProps,
        }}
        {...counterProps}
      >
        <CounterTriangleIcon
          className="counter_triangle"
          onClick={() => this.onChange(1)}
          data-id="increase-triangle"
        />
        <CounterTriangleIcon
          className="counter_triangle"
          onClick={(e) => {
            e.stopPropagation();
            this.onChange(-1);
          }}
          data-id="decrease-triangle"
        />
      </Input>
    );
  }
}

export default withAnalytics(Counter, 'onChange');
