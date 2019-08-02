import React from 'react';
import { Button } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Button
        style={{
          marginRight: 10,
        }}
        bgType="stroke"
        textColor="primary"
      >
        Primary
      </Button>
      <Button
        bgType="stroke"
        textColor="primary"
        disabled
      >
        Disabled
      </Button>
    </div>
  );
}

