import React from 'react';
import { Checkbox } from 'lib-react-components';

export default function Usage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Checkbox
        style={{
          marginRight: 10,
        }}
        color="black"
      />
      <Checkbox
        defaultChecked
        style={{
          marginRight: 10,
        }}
        colorOn="wrong"
      />
      <Checkbox
        defaultChecked
        iconColorOn="black"
        bgType="fill"
        style={{
          marginRight: 10,
        }}
      />
      <Checkbox
        defaultChecked
        iconColorOn="secondary"
        bgType="stroke"
        color="black"
        colorOn="secondary"
        iconColor="primary"
        iconType="square"
      />
    </div>
  );
}
