import React from 'react';
import { ButtonGroup, Button } from 'lib-react-components';

export default function Usage() {
  return (
    <React.Fragment>
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
      <br />
      <br />
      <ButtonGroup full>
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
    </React.Fragment>
  );
}
