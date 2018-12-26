import * as React from 'react';
import { Typography } from 'lib-react-components';

const Usage: React.SFC = () => {
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

export default Usage;
