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
        placeholder="Planet name"
        size="large"
        style={{
          maxWidth: 300,
          marginBottom: 10,
        }}
      />
      <TextField
        placeholder="Planet description"
        multiLine
        style={{
          marginBottom: 10,
        }}
      />
      <TextField
        placeholder="Planet description"
        multiLine
        size="large"
      />
    </div>
  );
}
