import React from 'react';
import { storiesOf } from '@storybook/react';
import { Modal } from './index';

storiesOf('Modal', module)
  .add('default view', () => (
    <Modal>
      <div style={{ padding: '20px' }}>
        Any content
      </div>
    </Modal>
  ));
