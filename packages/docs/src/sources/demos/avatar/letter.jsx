import React from 'react';
import { Avatar } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Avatar
        letters="Admin"
        style={{
          marginRight: 10,
        }}
      />
      <Avatar
        letters="User"
        color="secondary"
        style={{
          marginRight: 10,
        }}
        size={50}
      />
      <Avatar
        letters="Custom"
        bgType="stroke"
        color="wrong"
        textColor="wrong"
        size={60}
      />
    </div>
  );
}
