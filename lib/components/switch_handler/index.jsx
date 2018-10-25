import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * SwitchHandler component (for extend)
 */
export default class SwitchHandler extends PureComponent {
  static propTypes = {
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
    label: PropTypes.node, // eslint-disable-line
    /**
     * Where the label will be placed next to the toggle
     */
    labelPosition: PropTypes.oneOf(['left', 'right']), // eslint-disable-line
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
    defaultChecked: false,
    disabled: false,
    inputProps: {},
    labelPosition: 'left',
    className: '',
    tabIndex: 0,
    bgType: 'fill',
    color: 'light_grey',
    colorOn: 'primary',
    iconColor: 'grey',
    iconColorOn: 'white',
  };

  state = {
    checkedState: !!(this.props.checked || this.props.defaultChecked),
  };

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
  renderLabel(className) {
    const { label } = this.props;

    return label && (
      <div className={className}>
        {label}
      </div>
    );
  }

  render() {
    return null;
  }
}
