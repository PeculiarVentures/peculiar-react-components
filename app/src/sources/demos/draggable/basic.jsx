import React from 'react';
import { Draggable } from 'lib-react-components';

export default class Usage extends React.Component {
  state = {
    rect: [20, 20, 40, 20], // default rectangle
  }

  onChange = (rect) => {
    this.setState({ rect });
  }

  render() {
    return (
      <div
        style={{
          width: '300px', height: '300px', position: 'relative', margin: '0 auto',
        }}
        className="fill_grey"
      >
        <Draggable
          rect={this.state.rect}
          containerSizes={[300, 300]}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
