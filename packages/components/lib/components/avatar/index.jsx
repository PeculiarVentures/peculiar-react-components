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
   * If component's prop src is empty and prop letters have value
   * render
   * @return {ReactElement} markup
   */
  if (letters && !src) {
    /**
     * @return {ReactElement} markup
     */
    return (
      <div
        data-component="avatar"
        className={classNames(
          'avatar',
          'round_circle',
          'truncate_text',
          {
            [`fill_${color}`]: bgType === 'fill',
          },
          [`stroke_${color}`],
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
        {letters[0]}
      </div>
    );
  }

  /**
   * @return {ReactElement} markup
   */
  return (
    <img
      data-component="avatar"
      src={src || defaultSrc}
      className={classNames(
        'avatar',
        'round_circle',
        {
          [`fill_${color}`]: color,
        },
        className,
      )}
      style={{
        ...style,
        height: size,
        width: size,
      }}
      onError={(e) => { e.target.src = defaultSrc; }}
      {...other}
    />
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
  defaultSrc: 'data:image/png;base64,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',
  style: {},
  bgType: 'fill',
  color: 'light_grey',
  textColor: 'primary',
};
