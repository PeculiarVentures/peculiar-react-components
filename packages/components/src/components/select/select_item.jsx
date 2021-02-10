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
    focused,
    className,
    textColor,
    size,
    ...other
  } = props;

  return (
    <li
      data-component="select_item"
      aria-disabled={disabled}
      aria-selected={selected}
      data-focused={focused}
      data-value={value}
      className={classNames(
        'select_item',
        'truncate_text',
        [`select_item_${size}`],
        [`text_${textColor}`],
        className,
      )}
      role="option"
      tabIndex={-1}
      {...other}
    >
      {children}
    </li>
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
  focused: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Component text color from theme
   */
  textColor: PropTypes.string,
  /**
   * Component size
   */
  size: PropTypes.oneOf(['medium', 'large']),
};

SelectItem.defaultProps = {
  selected: false,
  disabled: false,
  focused: false,
  className: '',
  textColor: 'black',
  size: 'medium',
};
