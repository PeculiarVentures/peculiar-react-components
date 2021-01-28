import React from 'react';
import { PhoneField } from 'lib-react-components';

export default class Usage extends React.Component {
  state = {
    value: '',
    country: '',
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
      country: event.target.country.name,
    });
  }

  render() {
    const { value, country } = this.state;

    return (
      <>
        <PhoneField
          placeholder="Phone"
          onChange={this.handleChange}
        />
        <br />
        <p>
          Value: {value}
        </p>
        <p>
          Country: {country}
        </p>
      </>
    );
  }
}

