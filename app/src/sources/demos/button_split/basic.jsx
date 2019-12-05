import React from 'react';
import { ButtonSplit } from 'lib-react-components';

export default function Usage() {
  const icon = (
    <p>
      Content
    </p>
  );

  const actions = [
    {
      href: 'https://google.com',
      text: 'One',
    },
    {
      icon,
      text: 'Two',
    },
    {
      text: 'Three',
    },
  ];

  return (
    <ButtonSplit
      actions={actions}
      bgType="fill"
      color="primary"
    >
      Button text
    </ButtonSplit>
  );
}
