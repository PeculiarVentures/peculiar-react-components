import React from 'react';
import { Checkbox } from 'lib-react-components';

export default function Usage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Checkbox
        style={{
          marginRight: 10,
        }}
      />
      <Checkbox
        defaultChecked
        style={{
          marginRight: 10,
        }}
      />
      <Checkbox
        disabled
        style={{
          marginRight: 10,
        }}
      />
      <Checkbox
        disabled
        defaultChecked
      />
    </div>
  );
}
