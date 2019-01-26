import * as React from 'react';

const RightTriangleIcon: React.SFC<React.SVGAttributes<HTMLOrSVGElement>> = (
  props,
): JSX.Element => {
  return (
    <svg
      {...props}
      viewBox="0 0 20 10"
    >
      <path data-fill="true" d="M10 0l10 10H0z" fillRule="evenodd" />
    </svg>
  );
};

export default RightTriangleIcon;
