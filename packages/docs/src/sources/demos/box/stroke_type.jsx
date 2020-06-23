import React from 'react';
import { Box } from 'lib-react-components';

export default function Usage() {
  return (
    <React.Fragment>
      <Box
        stroke="primary"
        strokeType="left"
        style={{
          width: 100,
          height: 100,
          display: 'inline-block',
          marginRight: 10,
        }}
      />
      <Box
        stroke="primary"
        strokeType="right"
        style={{
          width: 100,
          height: 100,
          display: 'inline-block',
          marginRight: 10,
        }}
      />
      <Box
        stroke="primary"
        strokeType="top"
        style={{
          width: 100,
          height: 100,
          display: 'inline-block',
          marginRight: 10,
        }}
      />
      <Box
        stroke="primary"
        strokeType="bottom"
        style={{
          width: 100,
          height: 100,
          display: 'inline-block',
          marginRight: 10,
        }}
      />
    </React.Fragment>
  );
}
