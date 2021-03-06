import React from 'react';
import { Counter } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Counter
        minValue={0}
        maxValue={5}
        bgType="stroke"
        color="primary"
        textColor="primary"
        colorFocus="success"
        counterProps={{
          style: {
            marginBottom: 20,
          },
        }}
      />
      <Counter
        minValue={0}
        maxValue={5}
        minValuePlaceholder="Min"
        maxValuePlaceholder="Max"
        color="secondary"
        textColor="white"
        counterProps={{
          style: {
            marginBottom: 20,
          },
        }}
      />
      <Counter
        minValue={0}
        maxValue={5}
        color="wrong"
        bgType="stroke"
        textColor="secondary"
      />
    </div>
  );
}
