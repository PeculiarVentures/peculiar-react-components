import React, { Component } from 'react';
import { Button, Snackbar } from 'lib-react-components';

export default class Usage extends Component {
  state = {
    open: false,
    verticalPosition: 'bottom',
  };

  handleOpen(verticalPosition) {
    this.setState({
      open: true,
      verticalPosition,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.handleOpen('top')}>
          Top position
        </Button>
        <br />
        <br />
        <Button onClick={() => this.handleOpen('bottom')}>
          Bottom position
        </Button>
        <Snackbar
          autoHideDuration={4000}
          onClose={this.handleClose}
          {...this.state}
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
