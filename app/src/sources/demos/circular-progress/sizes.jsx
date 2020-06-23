import React from 'react';
import { CircularProgress } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <CircularProgress
        style={{
          marginRight: 10,
        }}
      />
      <CircularProgress
        size={40}
        style={{
          marginRight: 10,
        }}
      />
      <CircularProgress
        size={60}
        thickness={5}
      />
    </div>
  );
}
