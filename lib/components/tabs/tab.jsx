import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withAnalytics from '../../containers/analytics_hoc';

/**
 * Tab component
 */
function Tab(props) {
  const {
    className,
    disabled,
    value,
    children,
    selected,
    onClick,
    tabIndex,
    color,
    colorOn,
    ...other
  } = props;

  /**
   * Tab click handler
   * @param {SytheticEvent} e
   */
  function onClickHandler(e) {
    if (!disabled) onClick(e, value);
  }

  return (
    <button
      data-component="tab"
      data-selected={selected}
      type="button"
      tabIndex={tabIndex}
      onClick={onClickHandler}
      className={classNames(
        'tab',
        'h5',
        {
          [`text_${color}`]: !selected,
          [`text_${colorOn}`]: selected,
          [`stroke_${colorOn}`]: selected,
        },
        className,
      )}
      disabled={disabled || selected}
      {...other}
    >
      <span>
        {children}
      </span>
    </button>
  );
}

Tab.propTypes = {
  /**
   * The css class name of the root element
   */
  className: PropTypes.string,
  /**
   * Disabled the Tab if set to true
   */
  disabled: PropTypes.bool,
  /**
   * If value prop passed to Tabs component, this value prop is also required.
   * It assigns a value to the tab so that it can be selected by the Tabs
   */
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  /**
   * The contents of the Tab
   */
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  /**
   * Selected the Tab if set to true
   */
  selected: PropTypes.bool,
  /**
   * Callback function that is fired when the Tab clicked
   */
  onClick: PropTypes.func,
  /**
   * The tabIndex of the root element
   */
  tabIndex: PropTypes.number,
  /**
   * Component color from theme
   */
  color: PropTypes.string,
  /**
   * Component checked color from theme
   */
  colorOn: PropTypes.string,
};

Tab.defaultProps = {
  className: '',
  disabled: false,
  selected: false,
  onClick() {},
  tabIndex: 0,
  color: 'grey',
  colorOn: 'primary',
};

export default withAnalytics(Tab, 'onClick');
