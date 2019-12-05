import React from 'react';
import { ButtonGroup, Button } from 'lib-react-components';

export default function Usage() {
  return (
    <ButtonGroup>
      <Button>
        One
      </Button>
      <Button>
        Two
      </Button>
      <Button disabled>
        Three
      </Button>
    </ButtonGroup>
  );
}
