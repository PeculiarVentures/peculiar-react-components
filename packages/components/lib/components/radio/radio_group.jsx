import React, { PureComponent, Children, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import withAnalytics from '../../containers/analytics_hoc';

/**
 * RadioGroup component
 */
class RadioGroup extends PureComponent {
  static propTypes = {
    /**
     * The content of the component
     */
    children: PropTypes.node.isRequired,
    /**
     * The name used to reference the value of the control
     */
    name: PropTypes.string.isRequired,
    /**
     * The `value` property of the radio button that will be
     * selected by default. This takes precedence over the `checked` property
     * of the `Radio` elements
     */
    defaultValue: PropTypes.string,
    /**
     * Value of the selected radio button
     */
    value: PropTypes.string,
    /**
     * Change callback
     */
    onChange: PropTypes.func,
  };

  static defaultProps = {
    defaultValue: '',
    value: '',
    onChange() {},
  }

  constructor(props) {
    super();

    this.state = {
      valueState: props.value || props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      this.setState({
        valueState: nextProps.value,
      });
    }
  }

  /**
   * Handler for radio change event
   * @param {SytheticEvent} e
   * @param {string} val
   */
  handleRadioChange = (e, val) => {
    const { value, onChange } = this.props;

    if (onChange) onChange(e, val);

    if (!value) {
      this.setState({
        valueState: val,
      });
    }
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      children,
      name,
      defaultValue,
      value,
      onChange,
      ...other
    } = this.props;
    const { valueState } = this.state;

    return (
      <div {...other}>
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) {
            return null;
          }

          return cloneElement(child, {
            key: index,
            name,
            checked: valueState === child.props.value,
            onChange: this.handleRadioChange,
          });
        })}
      </div>
    );
  }
}

export default withAnalytics(RadioGroup, 'onChange');
