import React from 'react';
import PropTypes from 'prop-types';

function getOpacity(value) {
  if (typeof value === 'number') {
    if (value > 1) {
      return 1;
    }

    if (value < 0) {
      return 0;
    }

    return value;
  }

  return 1;
}

function getBorderWidth(type, width) {
  if (!type) {
    return width;
  }

  let top = 0;
  let right = 0;
  let bottom = 0;
  let left = 0;

  if (type === 'horizontal' || type === 'top') {
    top = width;
  }

  if (type === 'horizontal' || type === 'bottom') {
    bottom = width;
  }

  if (type === 'vertical' || type === 'left') {
    left = width;
  }

  if (type === 'vertical' || type === 'right') {
    right = width;
  }

  return [top, right, bottom, left, ''].join('px ');
}

/**
 * Box component
 */
export default function Box(props) {
  const {
    tagType,
    fill,
    fillOpacity,
    stroke,
    strokeWidth,
    strokeOpacity,
    strokeStyle,
    strokeType,
    style, // eslint-disable-line
    ...other
  } = props;

  const newStyle = {
    ...style,
    backgroundColor: fill
      ? `rgba(var(--${fill}), ${getOpacity(fillOpacity)})`
      : undefined,
    borderColor: stroke
      ? `rgba(var(--${stroke}), ${getOpacity(strokeOpacity)})`
      : undefined,
    borderWidth: stroke
      ? getBorderWidth(strokeType, strokeWidth)
      : undefined,
    borderStyle: stroke
      ? strokeStyle
      : undefined,
  };

  const Component = tagType;

  return (
    <Component
      {...other}
      style={newStyle}
    />
  );
}

Box.propTypes = {
  /**
   * This is what will be displayed inside the component.
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element.
   */
  tagType: PropTypes.string,
  /**
   * Component background-color from theme.
   */
  fill: PropTypes.string,
  /**
   * Component background-color opacity.
   */
  fillOpacity: PropTypes.number,
  /**
   * Component border-color from theme.
   */
  stroke: PropTypes.string,
  /**
   * Component border width.
   */
  strokeWidth: PropTypes.number,
  /**
   * Component border-color opacity.
   */
  strokeOpacity: PropTypes.number,
  /**
   * Component border style.
   */
  strokeStyle: PropTypes.oneOf(['solid', 'dashed', 'dotted', 'none']),
  /**
   * Component border position.
   */
  strokeType: PropTypes.oneOf(['horizontal', 'vertical', 'top', 'right', 'bottom', 'left']),
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
};

Box.defaultProps = {
  children: null,
  tagType: 'div',
  fill: undefined,
  fillOpacity: undefined,
  stroke: undefined,
  strokeStyle: 'solid',
  strokeWidth: 1,
  strokeOpacity: undefined,
  strokeType: undefined,
  className: undefined,
};
