import React from 'react';
import { Counter } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Counter
        minValue={0}
        maxValue={5}
        disabled
      />
      <Counter
        minValue={0}
        maxValue={5}
        color="primary"
        textColor="secondary"
      />
    </div>
  );
}
