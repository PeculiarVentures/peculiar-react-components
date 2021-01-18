import React from 'react';
import { Autocomplete } from 'lib-react-components';
import planets from './planets.json';

export default function Usage() {
  return (
    <React.Fragment>
      <Autocomplete
        placeholder="Planet name"
        options={planets}
      />
      <br/>
      <Autocomplete
        placeholder="Default value"
        options={planets}
        defaultValue={planets[1]}
      />
      <br/>
      <Autocomplete
        placeholder="Required"
        options={planets}
        required
      />
      <br/>
      <Autocomplete
        placeholder="Disabled"
        options={planets}
        disabled
      />
    </React.Fragment>
  );
}
