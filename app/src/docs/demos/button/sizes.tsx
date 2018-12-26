import * as React from 'react';
import { Button } from 'lib-react-components';

const Usage: React.SFC = () => {
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
    </div>
  );
}

export default Usage;
