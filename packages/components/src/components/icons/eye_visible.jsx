import React from 'react';

/**
 * EyeVisibleIcon - EyeVisibleIcon svg component
 * @param props
 * @return {ReactElement} markup
 */
export default function EyeVisibleIcon(props) {
  return (
    <svg
      viewBox="0 0 20 13"
      {...props}
    >
      <path
        d="M10 5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1M10 9C8.62 9 7.5 7.88 7.5 6.5S8.62 4 10 4s2.5 1.12 2.5 2.5S11.38 9 10 9m8.53-2.64C16.78 3.46 13.6 1.5 9.95 1.5 6.4 1.5 3.27 3.36 1.5 6.15v.07c-.07.08-.1.18-.1.28 0 .1.03.2.08.26v.08c1.8 2.8 4.9 4.66 8.47 4.66 3.64 0 6.83-1.95 8.58-4.86l.02-.14c0-.05 0-.1-.02-.14m1.2 1.3C17.67 10.85 14.08 13 10 13 5.9 13 2.3 10.86.28 7.64.1 7.3 0 6.9 0 6.5c0-.4.1-.8.28-1.15C2.32 2.15 5.9 0 10 0c4.1 0 7.7 2.14 9.73 5.36.17.34.27.73.27 1.14 0 .4-.1.8-.28 1.15"
        fillRule="evenodd"
      />
    </svg>
  );
}
