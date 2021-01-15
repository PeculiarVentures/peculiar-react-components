import React from 'react';
import { Select } from 'lib-react-components';
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
      <Select
        placeholder="Planet name"
        options={planets}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}
