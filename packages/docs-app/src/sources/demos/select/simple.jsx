import React from 'react';
import { Select } from 'lib-react-components';
import planets from './planets.json';

export default function Usage() {
  return (
    <React.Fragment>
      <Select
        placeholder="Planet name"
        options={planets}
      />
      <br/>
      <Select
        placeholder="Default value"
        options={planets}
        defaultValue={planets[1].value}
      />
      <br/>
      <Select
        placeholder="Required"
        options={planets}
        required
      />
      <br/>
      <Select
        placeholder="Disabled"
        options={planets}
        disabled
      />
    </React.Fragment>
  );
}
