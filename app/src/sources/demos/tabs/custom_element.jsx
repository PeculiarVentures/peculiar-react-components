import React from 'react';
import { Tabs, Tab } from 'lib-react-components';

const tabs = [
  {
    value: 'one',
    label: 'Item one',
  },
  {
    value: 'two',
    label: 'Item two',
  },
  {
    value: 'three',
    label: 'Disabled',
    disabled: true,
  },
];

export default function Usage() {
  return (
    <div>
      <Tabs
        defaultValue="one"
      >
        {tabs.map(t => (
          <Tab
            key={t.value}
            value={t.value}
            disabled={t.disabled}
            component={props => <a href="/" {...props} />}
          >
            {t.label}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
