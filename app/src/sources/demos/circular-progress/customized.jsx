import React from 'react';
import { CircularProgress } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <CircularProgress
        style={{
          marginRight: 10,
        }}
        size={40}
        colorProgress="secondary"
      />
      <CircularProgress
        style={{
          marginRight: 10,
        }}
        size={40}
        color="black"
        colorProgress="primary"
      />
      <CircularProgress
        size={40}
        color="success"
        colorProgress="wrong"
      />
    </div>
  );
}
