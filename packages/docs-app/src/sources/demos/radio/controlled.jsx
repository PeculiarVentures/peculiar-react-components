import React, { Component } from 'react';
import { RadioGroup, Radio } from 'lib-react-components';

export default class Usage extends Component {
  state = {
    value: '1',
  };

  render() {
    const { value } = this.state;

    return (
      <RadioGroup
        name="numbers"
        value={value}
        onChange={(e, val) => this.setState({ value: val })}
      >
        <Radio
          value="1"
          style={{
            marginRight: 10,
          }}
        />
        <Radio
          value="2"
          style={{
            marginRight: 10,
          }}
        />
        <Radio
          value="3"
        />
      </RadioGroup>
    );
  }
}
