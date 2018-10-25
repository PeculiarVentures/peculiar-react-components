import React from 'react';
import { Button } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Button
        style={{
          marginRight: 10,
        }}
      >
        Primary
      </Button>
      <Button
        disabled
      >
        Disabled
      </Button>
    </div>
  );
}
