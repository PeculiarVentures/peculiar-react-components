import React from 'react';
import { Typography, DeviceProvider } from 'lib-react-components';

export default function Usage() {
  return (
    <DeviceProvider>
      <Typography
        type="h1"
        tabletType="h3"
        mobileType="h5"
        color="primary"
      >
        Resize your window
      </Typography>
      <Typography
        type="b1"
        mobileType="b3"
        color="wrong"
      >
        Mobile type only
      </Typography>
    </DeviceProvider>
  );
}
