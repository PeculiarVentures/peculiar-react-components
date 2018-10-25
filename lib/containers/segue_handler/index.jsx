import React, { cloneElement, Fragment } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';

/**
 * SegueHandler component
 */
export default function SegueHandler(props) {
  const {
    children,
    value,
    defaultValue,
    ...other
  } = props;

  if (children.length && (value || defaultValue)) {
    for (let i = 0; i < children.length; i += 1) {
      const component = children[i];
      const { name, notExtendProps } = component.props;

      if (
        (!value && name === defaultValue) ||
        (value && name === value)
      ) {
        return cloneElement(
          component,
          notExtendProps ? {} : { ...other },
        );
      }
    }

    console.error('\'defaultValue\' or \'value\' prop of the <SegueHandler /> is wrong!');
  }

  return <Fragment />;
}

SegueHandler.propTypes = {
  /**
   * The content of the SegueHandler. This is usually used to pass SegueHandler elements
   */
  children: PropTypes.node.isRequired,
  /**
   * Makes SegueHandler controllable and show the child whose value prop matches this prop
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * The text string to use for the default child show
   */
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

SegueHandler.defaultProps = {
  value: '',
  defaultValue: '',
};
