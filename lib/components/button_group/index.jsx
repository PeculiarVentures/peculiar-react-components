import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * ButtonGroup component
 */
export default function ButtonGroup(props) {
  const { className, ...other } = props;

  return (
    <div
      {...other}
      data-component="button_group"
      className={classnames('button_group', className)}
    />
  );
}

ButtonGroup.propTypes = {
  /**
   * This is what will be displayed inside the root element.
   */
  children: PropTypes.node.isRequired,
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

ButtonGroup.defaultProps = {
  className: '',
};
