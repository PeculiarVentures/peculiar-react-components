import React from 'react';
import { Avatar } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Avatar
        letters="AU"
        style={{
          marginRight: 10,
        }}
      />
      <Avatar
        letters="AU"
        color="secondary"
        style={{
          marginRight: 10,
        }}
        size={50}
      />
      <Avatar
        letters="AU"
        bgType="stroke"
        color="wrong"
        textColor="wrong"
        size={60}
      />
    </div>
  );
}
