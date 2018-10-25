import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Avatar component
 */
export default function Avatar(props) {
  const {
    letters,
    className,
    size,
    src,
    defaultSrc,
    style,
    bgType,
    color,
    textColor,
    onError, // eslint-disable-line
    ...other
  } = props;

  /**
   * If component's prop src is not empty
   * render
   * @return {ReactElement} markup
   */
  if (src) {
    return (
      <img
        src={src}
        className={classNames(
          'avatar',
          'round_circle',
          className,
        )}
        style={{
          ...style,
          height: size,
          width: size,
        }}
        onError={(e) => { e.target.src = defaultSrc; }}
        data-component="avatar"
        {...other}
      />
    );
  }

  /**
   * @return {ReactElement} markup
   */
  return (
    <div
      className={classNames(
        'avatar',
        'round_circle',
        [`avatar_${bgType}_${color}`],
        [`text_${textColor}`],
        className,
      )}
      style={{
        ...style,
        height: size,
        width: size,
        lineHeight: `${size - 2}px`,
      }}
      {...other}
    >
      {letters}
    </div>
  );
}

Avatar.propTypes = {
  /**
   * Can be used, for instance, to render a letter inside the avatar
   */
  letters: PropTypes.string,
  /**
   * The css class name of the root div or img element
   */
  className: PropTypes.string,
  /**
   * This is the size of the avatar in pixels
   */
  size: PropTypes.number,
  /**
   * If passed in, this component will render an img element. Otherwise, a div will be rendered
   */
  src: PropTypes.string,
  /**
   * If `src` passed and image not loaded - the image src will defaultSrc
   */
  defaultSrc: PropTypes.string,
  /**
   * Override the inline-styles of the root element
   */
  style: PropTypes.oneOfType([
    PropTypes.object,
  ]),
  /**
   * Component type one of `fill` or `stroke`.
   * If `fill` - component will be have background-color from `color` props.
   * If `stroke` - component will be have border-color from `color` props.
   */
  bgType: PropTypes.oneOf(['fill', 'stroke']),
  /**
   * Component color from theme
   */
  color: PropTypes.string,
  /**
   * Component text color from theme
   */
  textColor: PropTypes.string,
};

Avatar.defaultProps = {
  letters: '',
  className: '',
  size: 40,
  src: '',
  defaultSrc: '',
  style: {},
  bgType: 'fill',
  color: 'light_grey',
  textColor: 'primary',
};
