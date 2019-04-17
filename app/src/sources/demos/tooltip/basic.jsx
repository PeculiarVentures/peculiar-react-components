import React, { Fragment } from 'react';
import { Button, Tooltip } from 'lib-react-components';

export default function Usage() {
  return (
    <Fragment>
      <Tooltip
        content={
          <p>
            Tooltip content
          </p>
        }
        style={{
          display: 'inline-block',
          marginRight: 10,
        }}
      >
        <Button>
          Hover me
        </Button>
      </Tooltip>
      <Tooltip
        action="click"
        content={
          <p>
            Tooltip content
          </p>
        }
        style={{
          display: 'inline-block',
          marginRight: 10,
        }}
        color="grey"
        overlay={true}
      >
        <Button>
          Click me (with overlay)
        </Button>
      </Tooltip>
      <Tooltip
        action="focus"
        content={
          <p className="text_white">
            Tooltip content
          </p>
        }
        style={{
          display: 'inline-block',
        }}
        color="black"
      >
        <Button>
          Focus me
        </Button>
      </Tooltip>
    </Fragment>
  );
}
