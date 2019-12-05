import React from 'react';
import { Button, ButtonSplit } from 'lib-react-components';

export default function Usage() {
  return (
    <ButtonSplit className="temp">
      <Button
        bgType="stroke"
        textColor="primary"
      >
        One
      </Button>
      <Button
        bgType="stroke"
        textColor="primary"
      >
        Two
      </Button>
      <Button
        bgType="stroke"
        textColor="primary"
      >
        Three
      </Button>
    </ButtonSplit>
  );
}
