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
      />
      <LinearProgress
        style={{
          marginBottom: 20,
        }}
        value={50}
      />
      <LinearProgress
        value={100}
      />
    </div>
  );
}
