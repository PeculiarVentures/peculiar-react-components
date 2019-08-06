import React from 'react';

/**
 * RequiredIcon - RequiredIcon svg component
 * @param props
 * @return {ReactElement} markup
 */
export default function RequiredIcon(props) {
  return (
    <svg
      viewBox="0 0 15.031 15.031"
      {...props}
    >
      <path
        data-fill="true"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.531,0C0.686,0,0,0.679,0,1.516c0,0.449,0.197,0.853,0.511,1.13 c0.007,0.007-0.001,0.017,0,0.024l11.872,11.902c0.004,0.003,0.014-0.002,0.017,0.002c0.275,0.282,0.659,0.457,1.085,0.457 c0.837,0,1.516-0.679,1.516-1.516C15,13.485,15.031,4,15.031,4c0-2.209-1.791-4-4-4H1.531z"
      />
    </svg>
  );
}
