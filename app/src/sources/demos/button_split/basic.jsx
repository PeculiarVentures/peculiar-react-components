import React from 'react';
import { ButtonSplit } from 'lib-react-components';

export default function Usage() {
  const actions = [
    {
      text: 'One',
    },
    {
      text: 'Two',
    },
    {
      text: 'Three',
    },
  ];

  return (
    <ButtonSplit
      className="temp"
      actions={actions}
    >
      Button text
    </ButtonSplit>
  );
}
