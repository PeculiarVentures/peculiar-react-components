import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { RadioGroup, Radio } from './index';

storiesOf('RadioGroup', module)
  .add('default', () => (
    <RadioGroup name="default" defaultValue="1">
      <Radio
        value="1"
        style={{ marginRight: 10 }}
      />
      <Radio value="2" />
    </RadioGroup>
  ));
