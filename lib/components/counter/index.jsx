import React from 'react';
import PropTypes from 'prop-types';

function prepareValue(value, defaultValue) {
  if (value || typeof value === 'number') {
    return value;
  }

  if (defaultValue || typeof defaultValue === 'number') {
    return defaultValue;
  }

  return '';
}

export default class SizePicker extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    defaultValue: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    onChange: PropTypes.func,
    minValueLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    iconColor: PropTypes.string,
    disabled: PropTypes.bool,
    bgType: PropTypes.oneOf(['fill', 'stroke']),
    color: PropTypes.string,
  }

  static defaultProps = {
    value: undefined,
    defaultValue: 0,
    minValue: undefined,
    maxValue: undefined,
    onChange() {},
    minValueLabel: undefined,
    iconColor: 'light_grey',
    disabled: false,
    bgType: 'fille',
    color: 'black',
  };

  constructor(props) {
    super(props);
    const { value, defaultValue } = props;

    this.state = {
      fontSize: prepareValue(value, defaultValue),
    };
  }

  changeFontSize(value) {
    const { fontSize } = this.state;
    const maxFont = fontSizes.length - 1;
    const newSize = fontSize + value;

    if (0 <= newSize && newSize <= maxFont) {
      this.setState({ fontSize: newSize });

      return;
    }

    if (newSize < 0) {
      this.setState({ fontSize: maxFont });

      return;
    }

    this.setState({ fontSize: 0 });
  }

  render() {
    const { fontSize } = this.state;
    const { title } = this.props;

    return(
      <React.Fragment>
        <Typography
          type="c1"
          color="grey_4"
          className={s.font_size_title}
        >
          {title}
        </Typography>
        <div
           className={classNames('stroke_grey_3_border', 'fill_white', 'round_small', s.counter)}
        >
          <Typography
            type="b3"
            className={s.size}
          >
           {fontSizes[fontSize].label}
          </Typography>
          <CounterTriangleIcon
            className={s.increase_triangle}
            onClick={this.changeFontSize.bind(this, 1)}
          />
          <CounterTriangleIcon
            className={s.decrease_triangle}
            onClick={this.changeFontSize.bind(this, -1)}
          />
        </div>
      </React.Fragment>
    );
  }
}