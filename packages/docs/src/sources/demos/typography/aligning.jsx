import React from 'react';
import { Typography } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Typography>
        Left
      </Typography>
      <Typography
        align="center"
      >
        Center
      </Typography>
      <Typography
        align="right"
      >
        Right
      </Typography>
    </div>
  );
}
