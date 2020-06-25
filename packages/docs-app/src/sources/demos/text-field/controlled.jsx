import React, { Component } from 'react';
import { TextField } from 'lib-react-components';

export default class Usage extends Component {
  state = {
    value: '',
  };

  render() {
    const { value } = this.state;

    return (
      <TextField
        placeholder="Planet name"
        style={{
          maxWidth: 300,
        }}
        value={value}
        onChange={e => this.setState({ value: e.target.value })}
      />
    );
  }
}
