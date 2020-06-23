import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * LinearProgress component
 */
export default function LinearProgress(props) {
  const {
    value,
    color,
    colorProgress,
    className,
    ...other
  } = props;

  /**
   * @return {ReactElement} markup
   */
  return (
    <div
      data-component="linear-progress"
      className={classNames(
        'linear_progress',
        'round_small',
        [`fill_${color}`],
        className,
      )}
      {...other}
    >
      <div
        className={classNames(
          'linear_progress_value',
          'round_small',
          [`fill_${colorProgress}`],
        )}
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  );
}

/**
 * Verifies value is within the min/max range.
 * @param {object} props
 * @param {string} propName
 * @param {string} componentName
 * @returns {object}
 */
function valueInRangePropType(props, propName, componentName, ...rest) {
  const error = PropTypes.number(props, propName, componentName, ...rest);

  if (error !== null) {
    return error;
  }

  const value = props[propName];

  if (value < 0 || value > 100) {
    return new Error(`${propName} should be within the range specified by 0 and 100`);
  }

  return null;
}

LinearProgress.propTypes = {
  /**
   * Progress line color from theme
   */
  color: PropTypes.string,
  /**
   * Background line color from theme
   */
  colorProgress: PropTypes.string,
  /**
   * Current progress value
   */
  value: valueInRangePropType,
  /**
   * The CSS class name of the root element
   */
  className: PropTypes.string,
};

LinearProgress.defaultProps = {
  color: 'light_grey',
  colorProgress: 'primary',
  value: 0,
  className: '',
};
