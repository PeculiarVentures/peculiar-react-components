import * as React from 'react';
import { Typography } from 'lib-react-components';

const Usage: React.SFC = () => {
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

export default Usage;
