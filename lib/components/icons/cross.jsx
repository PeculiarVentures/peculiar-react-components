import React from 'react';

/**
 * CrossIcon - CrossIcon svg component
 * @param props
 * @return {ReactElement} markup
 */
export default function CrossIcon(props) {
  return (
    <svg
      viewBox="0 0 16 15"
      {...props}
    >
      <rect
        data-fill
        width="19.038"
        height="2.176"
        x="15.5"
        y="1.538"
        rx="1.088"
        transform="rotate(135 15.5 1.538)"
      />
      <rect
        data-fill
        width="19.038"
        height="2.176"
        x="13.961"
        y="15"
        rx="1.088"
        transform="rotate(-135 13.961 15)"
      />
    </svg>
  );
}
