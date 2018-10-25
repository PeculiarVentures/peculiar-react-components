import React, { Component } from 'react';
import { Switch } from 'lib-react-components';

export default class Usage extends Component {
  state = {
    mercury: false,
    venus: false,
    earth: true,
  };

  handleChange = name => (event, checked) => {
    this.setState({
      [name]: checked,
    });
  };

  render() {
    const {
      mercury,
      venus,
      earth,
    } = this.state;

    return (
      <div>
        <Switch
          style={{
            marginRight: 10,
          }}
          name="mercury"
          checked={mercury}
          onCheck={this.handleChange('mercury')}
        />
        <Switch
          style={{
            marginRight: 10,
          }}
          name="venus"
          checked={venus}
          onCheck={this.handleChange('venus')}
        />
        <Switch
          name="earth"
          checked={earth}
          onCheck={this.handleChange('earth')}
        />
      </div>
    );
  }
}
