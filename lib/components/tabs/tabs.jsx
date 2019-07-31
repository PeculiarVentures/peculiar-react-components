import React, { PureComponent, Children, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withAnalytics from '../../containers/analytics_hoc';

/**
 * Tabs component
 */
class Tabs extends PureComponent {
  static propTypes = {
    /**
     * The contents of the Tabs
     */
    children: PropTypes.node.isRequired,
    /**
     * The text string to use for the default tab selected
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * Makes Tabs controllable and selects the tab whose value prop matches this prop
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /**
     * Callback function that is fired when the Tabs selected value changed
     */
    onChange: PropTypes.func,
    /**
     * Component color from theme
     */
    color: PropTypes.string,
    /**
     * Component checked color from theme
     */
    colorOn: PropTypes.string,
    /**
     * Component content aligment
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),
    /**
     * The CSS class name of the root element
     */
    className: PropTypes.string,
  };

  static defaultProps = {
    defaultValue: '',
    value: '',
    onChange() {},
    color: 'grey',
    colorOn: 'primary',
    align: 'center',
    className: '',
  };

  state = {
    value: this.props.value || this.props.defaultValue,
  };

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  /**
   * Set value to component state
   * @param {string} value
   */
  setValue(value) {
    this.setState({
      value,
    });
  }

  /**
   * Handler for tabs change event
   * @param {SytheticEvent} e
   * @param {string} val
   */
  handleChange = (e, val) => {
    const { value, onChange } = this.props;
    const { value: valueState } = this.state;

    if (value && value !== val) {
      return onChange(e, val);
    }

    if (valueState && valueState !== val) {
      onChange(e, val);
    }

    return this.setValue(val);
  };

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    const {
      children,
      defaultValue,
      value,
      onChange,
      color,
      colorOn,
      align,
      className,
      ...other
    } = this.props;
    const { value: valueState } = this.state;

    return (
      <div
        data-component="tabs"
        data-value={valueState}
        className={classNames(
          [`text_${align}`],
          className,
        )}
        {...other}
      >
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) {
            return null;
          }

          return cloneElement(child, {
            key: index,
            selected: valueState === child.props.value,
            onClick: this.handleChange,
            color,
            colorOn,
          });
        })}
      </div>
    );
  }
}

export default withAnalytics(Tabs, 'onChange');
