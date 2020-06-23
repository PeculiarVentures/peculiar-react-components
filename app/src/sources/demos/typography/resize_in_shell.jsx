import React, { Component } from 'react';
import { Typography, AdaptShell } from 'lib-react-components';

export default class Usage extends Component {
  componentDidMount() { this.adapt = new AdaptShell(this.container); }
  componentWillUnmount() { this.adapt.destroy(); }

  render() {
    return (
      <div ref={(node) => { this.container = node; /* for example isolation */ }}>
        <Typography
          type="h1"
          tabletType="h3"
          mobileType="h5"
          color="primary"
        >
          Resize your window
        </Typography>
        <Typography
          type="b1"
          mobileType="b3"
          color="wrong"
        >
          Mobile type only
        </Typography>
      </div>
    );
  }
}
