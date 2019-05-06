import React from 'react';
import { Checkbox } from 'lib-react-components';

export default function Usage() {
  return (
    <div style={{ textAlign: 'center' }}>
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
      <Checkbox
        defaultChecked
        iconColorOn="secondary"
        bgType="fill"
        color="grey"
        className="stroke_secondary"
        classNameOn="stroke_black"
        colorOn="grey_2"
        iconColor="grey_1"
        iconType="square"
      />
    </div>
  );
}
