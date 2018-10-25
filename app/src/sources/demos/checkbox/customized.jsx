import React from 'react';
import { Checkbox } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Checkbox
        style={{
          marginRight: 10,
        }}
        color="black"
      />
      <Checkbox
        defaultChecked
        style={{
          marginRight: 10,
        }}
        colorOn="wrong"
      />
      <Checkbox
        defaultChecked
        iconColorOn="black"
        bgType="fill"
      />
    </div>
  );
}
