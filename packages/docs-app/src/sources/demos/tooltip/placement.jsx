import React, { Fragment, Component } from 'react';
import { Button, Tooltip, Select } from 'lib-react-components';

const options = [
  'auto-start',
  'auto',
  'auto-end',
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-end',
  'bottom',
  'bottom-start',
  'left-end',
  'left',
  'left-start',
];

export default class Usage extends Component {
  state = {
    placement: options[0],
  };

  render() {
    const { placement } = this.state;

    return (
      <Fragment>
        <Select
          style={{
            maxWidth: 300,
            marginBottom: 40,
          }}
          onChange={(e) => {
            this.setState({
              placement: e.target.value,
            });
          }}
          options={options.map((opt) => ({
            label: opt,
            value: opt,
          }))}
          defaultValue={placement}
        />
        <Tooltip
          placement={placement}
          content={
            <p>
              Tooltip content
            </p>
          }
          style={{
            width: 100,
            margin: '0 auto',
          }}
        >
          <Button>
            Hover me
          </Button>
        </Tooltip>
      </Fragment>
    );
  }
}
