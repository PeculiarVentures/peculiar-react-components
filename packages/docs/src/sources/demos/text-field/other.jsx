import React from 'react';
import { TextField } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <TextField
        placeholder="Password input"
        type="password"
        style={{
          maxWidth: 300,
          marginBottom: 10,
        }}
      />
      <TextField
        placeholder="Required input"
        required
        style={{
          maxWidth: 300,
          marginBottom: 10,
        }}
      />
      <TextField
        placeholder="With validation"
        validation={[
          'email',
          value => value && value.length > 10,
        ]}
        style={{
          maxWidth: 300,
        }}
      />
    </div>
  );
}
