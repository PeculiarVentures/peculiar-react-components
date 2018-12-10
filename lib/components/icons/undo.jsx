import React from 'react';

/**
 * UndoIcon - UndoIcon svg component
 * @param props
 * @return {ReactElement} markup
 */
export default function UndoIcon(props) {
  return (
    <svg
      viewBox="0 0 17 17"
      {...props}
    >
      <path
        data-fill
        d="M5.688 10.375c-.08 0-.16-.03-.222-.091L1.091 5.907a.313.313 0 0 1 0-.441L5.466 1.09a.313.313 0 0 1 .442.442L1.754 5.687l4.154 4.154a.313.313 0 0 1-.22.534z"
      />
      <path
        data-stroke
        strokeWidth="2"
        d="M5.688 10.375c-.08 0-.16-.03-.222-.091L1.091 5.907a.313.313 0 0 1 0-.441L5.466 1.09a.313.313 0 0 1 .442.442L1.754 5.687l4.154 4.154a.313.313 0 0 1-.22.534z"
      />
      <path
        data-fill
        d="M15.688 16a.313.313 0 0 1-.313-.312C15.375 10.346 11.03 6 5.688 6H1.313a.313.313 0 0 1 0-.625h4.375C11.374 5.375 16 10.001 16 15.688c0 .172-.14.312-.312.312z"
      />
      <path
        d="M15.688 16a.313.313 0 0 1-.313-.312C15.375 10.346 11.03 6 5.688 6H1.313a.313.313 0 0 1 0-.625h4.375C11.374 5.375 16 10.001 16 15.688c0 .172-.14.312-.312.312z"
        data-stroke
        strokeWidth="2"
      />
    </svg>
  );
}
