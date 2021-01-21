import React from 'react';
import { Autocomplete } from 'lib-react-components';
import planets from './planets.json';

export default function Usage() {
  return (
    <React.Fragment>
      <Autocomplete
        placeholder="Size"
        options={planets}
        size="large"
      />
      <br/>
      <Autocomplete
        placeholder="Colors"
        options={planets}
        bgType="fill"
        color="success"
        textColor="white"
        colorFocus="secondary"
      />
      <br/>
      <Autocomplete
        placeholder="Option"
        options={planets}
        renderOption={(option) => (
          <span>
            🌍 {option}
          </span>
        )}
      />
      <br/>
      <Autocomplete
        placeholder="Disable filtering"
        options={planets}
        disableFiltering
      />
    </React.Fragment>
  );
}
