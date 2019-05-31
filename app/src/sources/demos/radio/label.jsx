import React from 'react';
import { RadioGroup, Radio } from 'lib-react-components';

export default function Usage() {
  return (
    <RadioGroup name="numbers" defaultValue="1">
      <Radio
        value="1"
        style={{
          marginBottom: 10,
        }}
        label="I am label left"
      />
      <br />
      <Radio
        value="2"
        label="I am label right"
        labelPosition="right"
      />
    </RadioGroup>
  );
}
