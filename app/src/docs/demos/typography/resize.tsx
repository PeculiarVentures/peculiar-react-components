import * as React from 'react';
import { Typography } from 'lib-react-components';

const Usage: React.SFC = () => {
  return (
    // <DeviceProvider>
    <Typography
      type="h1"
      tabletType="h3"
      mobileType="h5"
      color="primary"
    >
      Resize your window
    </Typography>
    // <Typography
    //   type="b1"
    //   mobileType="b3"
    //   color="wrong"
    // >
    //   Mobile type only
    // </Typography>
    // </DeviceProvider>
  );
}

export default Usage;
