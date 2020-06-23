import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * SelectItem component
 */
export default function SelectItem(props) {
  const {
    children,
    value,
    selected,
    disabled,
    hasFocus,
    className,
    textColor,
    colorFocus,
    size,
    ...other
  } = props;

  return (
    <div
      data-component="select_item"
      data-disabled={disabled}
      data-selected={selected}
      data-has-focus={hasFocus}
      data-value={value}
      className={classNames(
        'select_item',
        'truncate_text',
        [`select_item_${size}`],
        {
          [`select_item_focus_${colorFocus}`]: hasFocus,
          [`text_${textColor}`]: !selected,
        },
        {
          [`text_${colorFocus}`]: selected,
        },
        className,
      )}
      {...other}
    >
      {children}
    </div>
  );
}

SelectItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  hasFocus: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Component text color from theme
   */
  textColor: PropTypes.string,
  /**
   * Component focus color from theme
   */
  colorFocus: PropTypes.string,
  /**
   * Component size
   */
  size: PropTypes.oneOf(['medium', 'large']),
};

SelectItem.defaultProps = {
  selected: false,
  disabled: false,
  hasFocus: false,
  className: '',
  textColor: 'black',
  colorFocus: 'primary',
  size: 'medium',
};
