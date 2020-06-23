import React from 'react';
import { Button } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Button
        style={{
          marginRight: 10,
        }}
        color="secondary"
      >
        Fill secondary
      </Button>
      <Button
        bgType="stroke"
        color="wrong"
        textColor="wrong"
      >
        Stroke wrong
      </Button>
    </div>
  );
}
