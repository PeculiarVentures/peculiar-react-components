import React from 'react';
import { TextField } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <TextField
        placeholder="Planet name"
        color="black"
        textColor="black"
        style={{
          maxWidth: 300,
          marginBottom: 10,
        }}
      />
      <TextField
        placeholder="Planet name"
        colorFocus="secondary"
        style={{
          maxWidth: 300,
          marginBottom: 10,
        }}
      />
      <TextField
        placeholder="Planet name"
        bgType="stroke"
        color="black"
        textColor="secondary"
        colorFocus="secondary"
        style={{
          maxWidth: 300,
        }}
      />
    </div>
  );
}
