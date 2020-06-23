import React from 'react';

/**
 * SelectArrowIcon - SelectArrowIcon svg component
 * @param props
 * @return {ReactElement} markup
 */
export default function SelectArrowIcon(props) {
  return (
    <svg
      viewBox="0 0 8 6"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M6.55.945c.556 0 .718.345.363.767L4.352 4.757c-.356.423-.935.421-1.29-.001L.493 1.706C.137 1.28.296.937.856.938l5.693.006z"
      />
    </svg>
  );
}
