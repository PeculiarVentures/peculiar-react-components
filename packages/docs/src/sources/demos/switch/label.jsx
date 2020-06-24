import React from 'react';
import { Switch } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Switch
        bgType="stroke"
        iconColorOn="primary"
        style={{
          marginBottom: 10,
        }}
        label="I am label left"
      />
      <br />
      <Switch
        bgType="stroke"
        iconColorOn="primary"
        defaultChecked
        label="I am label right"
        labelPosition="right"
      />
    </div>
  );
}

