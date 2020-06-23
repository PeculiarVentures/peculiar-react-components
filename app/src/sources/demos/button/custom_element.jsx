import React from 'react';
import { Button } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Button
        component={props => <label {...props} />}
        style={{
          marginRight: 10,
        }}
      >
        Choose file
        <input
          type="file"
          style={{
            height: 0,
            width: 0,
            overflow: 'hidden',
          }}
        />
      </Button>
      <Button
        component={props => <a href="/" {...props} />}
        style={{
          marginRight: 10,
        }}
        bgType="stroke"
        textColor="primary"
      >
        Link
      </Button>
    </div>
  );
}
