import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SIZE = 50;

/**
 * CircularProgress component
 */
export default function CircularProgress(props) {
  const {
    className,
    color,
    colorProgress,
    size,
    style,
    thickness,
    ...other
  } = props;

  return (
    <div
      data-component="circular-progress"
      className={classNames(
        'circle_progress',
        className,
      )}
      style={{
        width: size,
        height: size,
        ...style,
      }}
      {...other}
    >
      <svg
        className="circle_progress_svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        <circle
          className={[`circle_progress_stroke_${color}`]}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={(SIZE / 2) - 5}
          fill="none"
          strokeWidth={thickness}
        />
        <circle
          className={classNames(
            'circle_progress_circle',
            [`circle_progress_stroke_${colorProgress}`],
          )}
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={(SIZE / 2) - 5}
          fill="none"
          strokeWidth={thickness}
        />
      </svg>
    </div>
  );
}

CircularProgress.propTypes = {
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * The color of the static circle element.
   */
  color: PropTypes.string,
  /**
   * The color of the progress circle element.
   */
  colorProgress: PropTypes.string,
  /**
   * The size of the circle.
   */
  size: PropTypes.number,
  /**
   * The style of the root element.
   */
  style: PropTypes.oneOfType([
    PropTypes.object,
  ]),
  /**
   * The thickness of the circle.
   */
  thickness: PropTypes.number,
};

CircularProgress.defaultProps = {
  className: '',
  color: 'light_grey',
  colorProgress: 'primary',
  size: 24,
  style: {},
  thickness: 4,
};
