import React from 'react';
import { Button } from 'lib-react-components';

export default function Usage() {
  return (
    <React.Fragment>
      <Button
        style={{
          marginRight: 10,
        }}
        bgType="stroke"
        textColor="primary"
      >
        Stroke
      </Button>
      <Button
        bgType="stroke"
        textColor="primary"
        disabled
        style={{
          marginRight: 10,
        }}
      >
        Stroke
      </Button>
      <Button
        style={{
          marginRight: 10,
        }}
      >
        Fill
      </Button>
      <Button
        disabled
        style={{
          marginRight: 10,
        }}
      >
        Fill
      </Button>
      <Button
        style={{
          marginRight: 10,
        }}
        bgType="clear"
        textColor="primary"
      >
        Clear
      </Button>
      <Button
        disabled
        bgType="clear"
        textColor="primary"
      >
        Clear
      </Button>
    </React.Fragment>
  );
}

