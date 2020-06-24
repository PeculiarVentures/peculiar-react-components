import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '../typography';

/**
 * SwitchHandler component (for extend)
 */
export default class SwitchHandler extends PureComponent {
  static propTypes = {
    /**
     * Name attribute for input tag
     */
    name: PropTypes.string,
    /**
     * Initial state for input
     */
    defaultChecked: PropTypes.bool,
    /**
     * Will disable the toggle if true
     */
    disabled: PropTypes.bool, // eslint-disable-line
    /**
     * Callback function that is fired when the toggle switch is toggled
     */
    onCheck: PropTypes.func, // eslint-disable-line
    /**
     * Toggled if set to true
     */
    checked: PropTypes.bool, // eslint-disable-line
    /**
     * Properties for `<input type="checkbox" />` element
     */
    inputProps: PropTypes.oneOfType([ // eslint-disable-line
      PropTypes.object,
    ]),
    /**
     * Label for toggle
     */
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * Where the label will be placed next to the toggle
     */
    labelPosition: PropTypes.oneOf(['left', 'right']),
    /**
     * `Typography` props for label
     */
    labelProps: PropTypes.object, // eslint-disable-line
    /**
     * The CSS class name of the root element
     */
    className: PropTypes.string, // eslint-disable-line
    /**
     * The tabIndex of the root element
     */
    tabIndex: PropTypes.number, // eslint-disable-line
    /**
     * Component type one of `fill` or `stroke`.
     * If `fill` - component will be have background-color from `color` props.
     * If `stroke` - component will be have border-color from `color` props.
     */
    bgType: PropTypes.oneOf(['fill', 'stroke']), // eslint-disable-line
    /**
     * Component color from theme
     */
    color: PropTypes.string, // eslint-disable-line
    /**
     * Component checked color from theme
     */
    colorOn: PropTypes.string, // eslint-disable-line
    /**
     * Component icon color from theme
     */
    iconColor: PropTypes.string, // eslint-disable-line
    /**
     * Component checked icon color from theme
     */
    iconColorOn: PropTypes.string, // eslint-disable-line
  };

  static defaultProps = {
    name: undefined,
    defaultChecked: false,
    disabled: false,
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

  constructor(props) {
    super(props);

    this.state = {
      checkedState: !!(props.checked || props.defaultChecked),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { checked } = this.props;

    if (checked !== nextProps.checked) {
      this.setState({
        checkedState: nextProps.checked,
      });
    }
  }

  /**
   * onChange handler
   * @param {SytheticEvent} e
   */
  onChange = (e) => {
    const { onCheck } = this.props;
    const { checkedState } = this.state;

    if (onCheck) onCheck(e, !checkedState);

    if (!{}.hasOwnProperty.call(this.props, 'checked')) {
      this.setState({
        checkedState: !checkedState,
      });
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
        className="switch_label"
        data-position={labelPosition}
        {...labelProps}
      >
        {label}
      </Typography>
    );
  }

  render() {
    return null;
  }
}
