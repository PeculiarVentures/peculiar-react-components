import React from 'react';
import { TextField } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <TextField
        placeholder="Planet name"
        style={{
          maxWidth: 300,
          marginBottom: 10,
        }}
      />
      <TextField
        disabled
        placeholder="Planet name"
        style={{
          maxWidth: 300,
        }}
      />
    </div>
  );
}
