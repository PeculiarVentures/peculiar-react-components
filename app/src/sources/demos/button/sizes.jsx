import React from 'react';
import { Button } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Button
        size="small"
        style={{
          marginRight: 10,
        }}
      >
        Small
      </Button>
      <Button
        style={{
          marginRight: 10,
        }}
      >
        Medium
      </Button>
      <Button size="large">
        Large
      </Button>
      <br />
      <br />
      <Button full>
        Full
      </Button>
    </div>
  );
}
