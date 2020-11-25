import React from 'react';

/**
 * RightTriangleIcon - RightTriangleIcon svg component
 * @param props
 * @return {ReactElement} markup
 */
export default function RightTriangleIcon(props) {
  return (
    <svg
      viewBox="0 0 20 20"
      {...props}
    >
      <path data-fill="true" d="M10 12 l8 8 H2z" fillRule="evenodd" />
    </svg>
  );
}
