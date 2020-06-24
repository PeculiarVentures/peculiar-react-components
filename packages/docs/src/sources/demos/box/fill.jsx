import React from 'react';
import { Box } from 'lib-react-components';

export default function Usage() {
  return (
    <React.Fragment>
      <Box
        fill="primary"
        style={{
          width: 100,
          height: 100,
          display: 'inline-block',
          marginRight: 10,
        }}
      />
      <Box
        fill="primary"
        fillOpacity={0.5}
        style={{
          width: 100,
          height: 100,
          display: 'inline-block',
          marginRight: 10,
        }}
      />
      <Box
        fill="primary"
        fillOpacity={0.1}
        style={{
          width: 100,
          height: 100,
          display: 'inline-block',
        }}
      />
    </React.Fragment>
  );
}
