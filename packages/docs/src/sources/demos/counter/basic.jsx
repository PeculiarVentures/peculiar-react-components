import React from 'react';
import { Counter } from 'lib-react-components';

export default function Usage() {
  return (
    <Counter
      minValue={0}
      maxValue={5}
    />
  );
}
