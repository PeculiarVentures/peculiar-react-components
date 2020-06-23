import React from 'react';
import { Switch } from 'lib-react-components';

export default function Usage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Switch
        style={{
          marginRight: 10,
        }}
      />
      <Switch
        defaultChecked
        style={{
          marginRight: 10,
        }}
      />
      <Switch
        disabled
        style={{
          marginRight: 10,
        }}
      />
      <Switch
        disabled
        defaultChecked
      />
    </div>
  );
}
