import * as React from 'react';

const SelectArrowIcon: React.SFC<React.SVGAttributes<HTMLOrSVGElement>> = (props): JSX.Element => {
  return (
    <svg
      {...props}
      viewBox="0 0 8 6"
    >
      <path
        fillRule="evenodd"
        // tslint:disable-next-line
        d="M6.55.945c.556 0 .718.345.363.767L4.352 4.757c-.356.423-.935.421-1.29-.001L.493 1.706C.137 1.28.296.937.856.938l5.693.006z"
      />
    </svg>
  );
};

export default SelectArrowIcon;
