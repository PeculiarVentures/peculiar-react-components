import React from 'react';
import { Box } from 'lib-react-components';

export default function Usage() {
  return (
    <React.Fragment>
      <Box
        stroke="primary"
        style={{
          width: 100,
          height: 100,
          display: 'inline-block',
          marginRight: 10,
        }}
      />
      <Box
        stroke="primary"
        strokeOpacity={0.5}
        style={{
          width: 100,
          height: 100,
          display: 'inline-block',
          marginRight: 10,
        }}
      />
      <Box
        stroke="primary"
        strokeOpacity={0.1}
        style={{
          width: 100,
          height: 100,
          display: 'inline-block',
        }}
      />
    </React.Fragment>
  );
}
