import React from 'react';
import { Typography } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Typography
        color="primary"
      >
        Color primary
      </Typography>
      <Typography
        color="wrong"
      >
        Color wrong
      </Typography>
      <Typography
        color="success"
      >
        Color success
      </Typography>
    </div>
  );
}
