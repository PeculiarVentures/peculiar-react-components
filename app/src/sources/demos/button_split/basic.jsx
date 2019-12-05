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
      disabled: true,
      text: 'Three',
    },
  ];

  return (
    <ButtonSplit
      overlay
      actions={actions}
      bgType="fill"
      color="primary"
      tooltip={{ placement: 'bottom-end' }}
    >
      Button
    </ButtonSplit>
  );
}
