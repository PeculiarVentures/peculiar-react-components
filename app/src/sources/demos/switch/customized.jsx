import React from 'react';
import { Switch } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Switch
        style={{
          marginRight: 10,
        }}
        color="black"
      />
      <Switch
        defaultChecked
        style={{
          marginRight: 10,
        }}
        colorOn="wrong"
      />
      <Switch
        defaultChecked
        iconColorOn="black"
      />
    </div>
  );
}
