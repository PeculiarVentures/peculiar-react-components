import React, { Component } from 'react';
import { Button, Snackbar } from 'lib-react-components';

export default class Usage extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        <Button onClick={this.handleOpen}>
          Open
        </Button>
        <Snackbar
          autoHideDuration={4000}
          onClose={this.handleClose}
          open={open}
          action={[
            <Button
              size="small"
              key="0"
              onClick={this.handleClose}
              bgType="stroke"
              color="success"
              textColor="white"
            >
              Close
            </Button>,
          ]}
        >
          I love candy. I love cookies. I love cupcakes.
        </Snackbar>
      </div>
    );
  }
}
