import React from 'react';
import { Checkbox } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Checkbox
        bgType="stroke"
        iconColorOn="primary"
        style={{
          marginBottom: 10,
        }}
        label="I am label left"
      />
      <br />
      <Checkbox
        bgType="stroke"
        iconColorOn="primary"
        defaultChecked
        label="I am label right"
        labelPosition="right"
      />
    </div>
  );
}

