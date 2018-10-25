import React from 'react';
import { Switch } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Switch
        bgType="stroke"
        iconColorOn="primary"
        style={{
          marginRight: 10,
        }}
      />
      <Switch
        bgType="stroke"
        iconColorOn="primary"
        defaultChecked
        style={{
          marginRight: 10,
        }}
      />
      <Switch
        bgType="stroke"
        iconColorOn="primary"
        disabled
        style={{
          marginRight: 10,
        }}
      />
      <Switch
        bgType="stroke"
        iconColorOn="primary"
        disabled
        defaultChecked
      />
    </div>
  );
}

