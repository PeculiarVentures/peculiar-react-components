import * as React from 'react';
import { Button } from 'lib-react-components';

const Usage: React.SFC = () => {
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
        disabled
      >
        Disabled
      </Button>
    </div>
  );
}

export default Usage;
