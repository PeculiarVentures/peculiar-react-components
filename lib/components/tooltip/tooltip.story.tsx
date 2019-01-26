import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { select } from '@storybook/addon-knobs';
import { Tooltip } from './index';
import { Button } from '../button';

// const color = {
//   primary: 'primary',
//   secondary: 'secondary',
//   black: 'black',
//   grey: 'grey',
//   success: 'success',
//   wrong: 'wrong',
//   white: 'white',
//   light_grey: 'light_grey',
// };

// const align = {
//   left: 'left',
//   center: 'center',
//   right: 'right',
// };

// const props: any = {
//   regular: () => ({
//     color: select('Color (color)', color, Tabs.defaultProps.color),
//     colorOn: select('Color on (colorOn)', color, Tabs.defaultProps.colorOn),
//     align: select('Align (align)', align, Tabs.defaultProps.align),
//   }),
// };

storiesOf('Tooltip', module)
  .add('default', () => {
    // const regularProps = props.regular();

    return (
      <div style={{ width: '50vw' }}>
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
            Button
          </Button>
        </Tooltip>
      </div>
    );
  });
