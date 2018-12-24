import React from 'react';
import { Draggable } from 'lib-react-components';

export default function Usage() {
  return (
    <div
      style={{
        width: '300px', height: '300px', position: 'relative', margin: '0 auto',
      }}
      className="fill_grey"
    >
      <Draggable
        rect={[20, 20, 40, 20]}
        containerSizes={[300, 300]}
        onChange={e => console.log('onChange', e)}
        onRemove={() => console.log('onRemove')}
        onCancel={() => console.log('onCancel')}
        active={false}
        color="secondary"
      />
    </div>
  );
}
