import * as React from 'react';
import { Button } from 'lib-react-components';

const Usage: React.SFC = () => {
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

export default Usage;
