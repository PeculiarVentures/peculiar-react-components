import React from 'react';
import { Slider } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Slider
        style={{
          marginBottom: 20,
        }}
        iconColor="black"
      />
      <Slider
        style={{
          marginBottom: 20,
        }}
        defaultValue={0.3}
        color="wrong"
      />
      <Slider
        step={0.2}
        defaultValue={0.6}
        color="success"
        iconColor="success"
        progressColor="black"
      />
    </div>
  );
}
