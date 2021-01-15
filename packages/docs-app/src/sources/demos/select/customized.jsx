import React from 'react';
import { Select } from 'lib-react-components';
import planets from './planets.json';

export default function Usage() {
  return (
    <React.Fragment>
      <Select
        placeholder="Size"
        options={planets}
        size="large"
      />
      <br/>
      <Select
        placeholder="Colors"
        options={planets}
        bgType="fill"
        color="success"
        textColor="white"
        colorFocus="secondary"
      />
      <br/>
      <Select
        placeholder="Option"
        options={planets}
        renderOption={(option) => (
          <span>
            🌍 {option.label}
          </span>
        )}
      />
    </React.Fragment>
  );
}
