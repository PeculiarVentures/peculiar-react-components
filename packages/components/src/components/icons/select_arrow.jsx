import React from 'react';

/**
 * SelectArrowIcon - SelectArrowIcon svg component
 * @param props
 * @return {ReactElement} markup
 */
export default function SelectArrowIcon(props) {
  return (
    <svg
      width="10"
      height="10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.39 7.512a.5.5 0 01-.78 0l-2.96-3.7A.5.5 0 012.04 3h5.92a.5.5 0 01.39.812l-2.96 3.7z"
      />
    </svg>
  );
}
