import React from 'react';
import { ButtonSplit } from 'lib-react-components';

export default function Usage() {
  return (
    <ButtonSplit
      actions={[
        {
          href: 'https://google.com',
          text: 'Link',
        },
        {
          text: 'Button',
        },
        {
          disabled: true,
          text: 'Disabled',
        },
      ]}
    >
      Button
    </ButtonSplit>
  );
}
