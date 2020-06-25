import React, { Component } from 'react';
import { Button, Portal, Typography } from 'lib-react-components';

export default class Usage extends Component {
  state = {
    show: false,
  };

  handleClick = () => {
    this.setState({ show: !this.state.show });
  };

  container = null;

  render() {
    const { show } = this.state;

    return (
      <div>
        <Button onClick={this.handleClick}>
          {show ? 'UNMOUNT CHILDREN' : 'MOUNT CHILDREN'}
        </Button>
        <div
          style={{
            marginTop: 20,
          }}
        >
          {show && (
            <Portal container={this.container}>
              <Typography
                className="aui_stroke_grey"
              >
                Portal childrens
              </Typography>
            </Portal>
          )}
        </div>
        <div ref={(node) => { this.container = node; }} />
      </div>
    );
  }
}
