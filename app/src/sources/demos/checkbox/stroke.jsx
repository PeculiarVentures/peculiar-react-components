import React from 'react';
import { Checkbox } from 'lib-react-components';

export default function Usage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Checkbox
        bgType="stroke"
        iconColorOn="primary"
        style={{
          marginRight: 10,
        }}
      />
      <Checkbox
        bgType="stroke"
        iconColorOn="primary"
        defaultChecked
        style={{
          marginRight: 10,
        }}
      />
      <Checkbox
        bgType="stroke"
        iconColorOn="primary"
        defaultChecked
        iconType="square"
        style={{
          marginRight: 10,
        }}
      />
      <Checkbox
        bgType="stroke"
        iconColorOn="primary"
        disabled
        style={{
          marginRight: 10,
        }}
      />
      <Checkbox
        bgType="stroke"
        iconColorOn="primary"
        disabled
        defaultChecked
      />
    </div>
  );
}

