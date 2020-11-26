import React from 'react';

/**
 * RightTriangleIcon - RightTriangleIcon svg component
 * @param props
 * @return {ReactElement} markup
 */
export default function RightTriangleIcon(props) {
  return (
    <svg
      viewBox="0 0 20 10"
      {...props}
    >
      <path data-fill="true" d="M10 0l10 10H0z" fillRule="evenodd" />
    </svg>
  );
}
