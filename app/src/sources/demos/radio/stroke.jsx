import React from 'react';
import { RadioGroup, Radio } from 'lib-react-components';

export default function Usage() {
  return (
    <RadioGroup name="numbers" defaultValue="1">
      <Radio
        value="1"
        style={{
          marginRight: 10,
        }}
        bgType="stroke"
        iconColorOn="primary"
      />
      <Radio
        value="2"
        style={{
          marginRight: 10,
        }}
        bgType="stroke"
        iconColorOn="primary"
      />
      <Radio
        value="3"
        disabled
        bgType="stroke"
        iconColorOn="primary"
      />
    </RadioGroup>
  );
}

