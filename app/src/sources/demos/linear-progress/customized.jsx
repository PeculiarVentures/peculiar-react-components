import React from 'react';
import { LinearProgress } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <LinearProgress
        style={{
          marginBottom: 20,
        }}
        value={25}
        colorProgress="secondary"
      />
      <LinearProgress
        style={{
          marginBottom: 20,
        }}
        value={50}
        color="black"
        colorProgress="primary"
      />
      <LinearProgress
        value={70}
        color="success"
        colorProgress="wrong"
      />
    </div>
  );
}
