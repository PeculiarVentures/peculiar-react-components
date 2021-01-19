import React from 'react';
import { Autocomplete } from 'lib-react-components';
import planets from './planets.json';

export default class Usage extends React.Component {
  state = {
    value: '',
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const { value } = this.state;

    return (
      <Autocomplete
        placeholder="Planet name"
        options={planets}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}

