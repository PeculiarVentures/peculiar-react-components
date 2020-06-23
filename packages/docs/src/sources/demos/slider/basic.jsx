import React from 'react';
import { Slider } from 'lib-react-components';

export default function Usage() {
  return (
    <div>
      <Slider
        style={{
          marginBottom: 20,
        }}
      />
      <Slider
        style={{
          marginBottom: 20,
        }}
        defaultValue={0.3}
      />
      <Slider
        step={0.2}
        style={{
          marginBottom: 20,
        }}
        defaultValue={0.6}
      />
      <Slider
        disabled
        defaultValue={0.8}
      />
    </div>
  );
}
