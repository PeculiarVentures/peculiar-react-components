import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * ButtonGroup component
 */
export default function ButtonGroup(props) {
  const {
    className,
    children,
    bgType,
    color,
    textColor,
    size,
    disabled,
    full,
    ...other
  } = props;

  return (
    <div
      {...other}
      data-component="button_group"
      className={classnames(
        'button_group',
        {
          button_group_full: full,
        },
        className,
      )}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return React.cloneElement(child, {
          disabled: child.props.disabled || disabled,
          textColor: child.props.textColor || textColor,
          bgType,
          color,
          size,
          full,
        });
      })}
    </div>
  );
}

ButtonGroup.propTypes = {
  /**
   * Component type one of `fill` or `stroke`.
   * If `fill` - component will have background and border from `color` props.
   * If `stroke` - component will have border from `color` props and transparent background.
   * If `clear` - component will have transparent border and transparent background.
   */
  bgType: PropTypes.oneOf(['fill', 'stroke', 'clear']),
  /**
   * Button component color from theme
   */
  color: PropTypes.string,
  /**
   * Button component text color from theme
   */
  textColor: PropTypes.string,
  /**
   * Button component size
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Disables the buttons if set to true
   */
  disabled: PropTypes.bool,
  /**
   * This is what will be displayed inside the root element.
   */
  children: PropTypes.node.isRequired,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Component full-width.
   */
  full: PropTypes.bool,
};

ButtonGroup.defaultProps = {
  className: undefined,
  bgType: 'fill',
  color: 'primary',
  textColor: 'white',
  size: 'medium',
  disabled: false,
  full: false,
};
