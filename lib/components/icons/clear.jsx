import React from 'react';

/**
 * ClearIcon - ClearIcon svg component
 * @param props
 * @return {ReactElement} markup
 */
export default function ClearIcon(props) {
  return (
    <svg
      viewBox="0 0 23 17"
      fill="none"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M5.718 1l-4.49 6.744a1.364 1.364 0 0 0 0 1.512L5.719 16h14.431c.753 0 1.364-.61 1.364-1.364V2.364c0-.753-.61-1.364-1.364-1.364H5.718z"
        data-stroke
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.888 11.041c-.123.122-.563.57-.694.694a.682.682 0 0 1-.957-.021l-1.556-1.559-1.555 1.557a.678.678 0 0 1-.975.007c-.123-.123-.57-.563-.694-.694a.683.683 0 0 1 .022-.957l1.559-1.556c-.83-.83-1.51-1.508-1.558-1.555a.678.678 0 0 1-.006-.975c.122-.121.563-.57.694-.694a.683.683 0 0 1 .957.022c.046.048.725.727 1.556 1.559.83-.83 1.508-1.511 1.554-1.558a.678.678 0 0 1 .975-.006c.122.122.57.563.694.694a.683.683 0 0 1-.021.957c-.048.046-.727.725-1.559 1.556.83.83 1.51 1.508 1.557 1.554a.678.678 0 0 1 .007.975z"
        data-fill
      />
    </svg>
  );
}
