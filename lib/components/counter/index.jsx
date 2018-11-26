import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

export default class Counter extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    onChange: PropTypes.func,
    minValueLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxValueLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    bgType: PropTypes.oneOf(['fill', 'stroke']),
    color: PropTypes.string,
    textColor: PropTypes.string,
  }

  static defaultProps = {
    value: undefined,
    defaultValue: 0,
    minValue: undefined,
    maxValue: undefined,
    onChange() {},
    minValueLabel: undefined,
    maxValueLabel: undefined,
    disabled: false,
    bgType: 'fill',
    color: 'grey',
    textColor: 'black',
  };

  constructor(props) {
    super(props);
    const { value, defaultValue } = props;

    this.state = {
      fontSize: prepareValue(value, defaultValue),
    };
  }

  changeFontSize(value) {
    const { minValue, maxValue, onChange } = this.props;
    const { fontSize } = this.state;
    const newSize = fontSize + value;

    if (minValue <= newSize && newSize <= maxValue) {
      this.setState({ fontSize: newSize });
      onChange(newSize);

      return;
    }

    if (newSize < minValue) {
      this.setState({ fontSize: maxValue });
      onChange(newSize);

      return;
    }

    this.setState({ fontSize: minValue });
    onChange(newSize);
  }

  render() {
    const { fontSize } = this.state;
    const {
      bgType,
      color,
      minValue,
      minValueLabel,
      maxValue,
      maxValueLabel,
      textColor,
      disabled,
      ...other
    } = this.props;

    let value = fontSize;

    if (minValue === fontSize && minValueLabel) value = minValueLabel;
    if (maxValue === fontSize && maxValueLabel) value = maxValueLabel;

    return (
      <div
        className={classNames(
          'counter_container',
          `${bgType}_${color}`,
          `text_${textColor}`,
        )}
        data-typ={bgType}
        disabled={disabled}
        {...other}
      >
        {value}
        <CounterTriangleIcon
          className={classNames(
            'increase_triangle',
            `counter_fill_${textColor}`,
          )}
          onClick={() => !disabled && this.changeFontSize(1)}
        />
        <CounterTriangleIcon
          className={classNames(
            'decrease_triangle',
            `counter_fill_${textColor}`,
          )}
          onClick={() => !disabled && this.changeFontSize(-1)}
        />
      </div>
    );
  }
}
