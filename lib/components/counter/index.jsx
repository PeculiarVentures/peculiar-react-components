import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

export default class Counter extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    onChange: PropTypes.func,
    minValuePaceholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxValuePaceholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    bgType: PropTypes.oneOf(['fill', 'stroke']),
    color: PropTypes.string,
    textColor: PropTypes.string,
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
    minValuePaceholder: undefined,
    maxValuePaceholder: undefined,
    disabled: false,
    bgType: 'fill',
    color: 'grey',
    textColor: 'black',
    inputProps: {},
    counterProps: {},
  };

  constructor(props) {
    super(props);
    const { value, defaultValue } = props;

    this.state = {
      fontSize: prepareValue(value, defaultValue),
    };
  }

  onKeyDown = (e) => {
    e.preventDefault();
    if (e.keyCode === 38) this.changeFontSize(1);
    if (e.keyCode === 40) this.changeFontSize(-1);
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
      textColor,
      minValue,
      minValuePaceholder,
      maxValue,
      maxValuePaceholder,
      disabled,
      inputProps,
      counterProps,
    } = this.props;

    let value = fontSize;

    if (minValue === fontSize && minValuePaceholder) value = minValuePaceholder;
    if (maxValue === fontSize && maxValuePaceholder) value = maxValuePaceholder;

    return (
      <Input
        bgType={bgType}
        color={color}
        textColor={textColor}
        colorFocus={textColor}
        value={value}
        disabled={disabled}
        onKeyDown={this.onKeyDown}
        name="counter"
        inputProps={{
          readOnly: true,
          ...inputProps,
        }}
        {...counterProps}
      >
        <CounterTriangleIcon
          className={classNames(
            'increase_triangle',
            `fill_${textColor}`,
          )}
          onClick={() => !disabled && this.changeFontSize(1)}
        />
        <CounterTriangleIcon
          className={classNames(
            'decrease_triangle',
            `fill_${textColor}`,
          )}
          onClick={() => !disabled && this.changeFontSize(-1)}
        />
      </Input>
    );
  }
}
