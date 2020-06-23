import React from 'react';

/**
 * CheckmarkIcon - CheckmarkIcon svg component
 * @param props
 * @return {ReactElement} markup
 */
export default function CheckmarkIcon(props) {
  return (
    <svg
      viewBox="0 0 10 7"
      {...props}
    >
      <g transform="rotate(45 7.115 5.192)" fillRule="evenodd">
        <rect data-fill="true" x=".716" y="6.734" width="5.45" height="1.75" rx=".875" />
        <rect data-fill="true" transform="rotate(87 5.29 4.406)" x="1.213" y="3.531" width="8.156" height="1.75" rx=".875" />
      </g>
    </svg>
  );
}
