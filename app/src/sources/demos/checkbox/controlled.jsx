import React, { Component } from 'react';
import { Checkbox } from 'lib-react-components';

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
        <Checkbox
          style={{
            marginRight: 10,
          }}
          name="mercury"
          checked={mercury}
          onCheck={this.handleChange('mercury')}
        />
        <Checkbox
          style={{
            marginRight: 10,
          }}
          name="venus"
          checked={venus}
          onCheck={this.handleChange('venus')}
        />
        <Checkbox
          name="earth"
          checked={earth}
          onCheck={this.handleChange('earth')}
        />
      </div>
    );
  }
}
