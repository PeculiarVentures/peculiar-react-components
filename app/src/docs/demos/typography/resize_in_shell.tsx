import * as React from 'react';
import { Typography } from 'lib-react-components';

export default class Usage extends React.Component {
  // componentDidMount() { this.adapt = new AdaptShell(this.container); }
  // componentWillUnmount() { this.adapt.destroy(); }

  render() {
    return (
      <div>
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
