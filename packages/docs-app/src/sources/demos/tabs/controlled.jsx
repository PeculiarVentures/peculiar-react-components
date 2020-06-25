import React, { Component } from 'react';
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
    label: 'Item three',
  },
];

export default class Usage extends Component {
  state = {
    value: 'one',
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <Tabs
          value={value}
          onChange={(e, val) => this.setState({ value: val })}
        >
          {tabs.map(t => (
            <Tab
              key={t.value}
              value={t.value}
              disabled={t.disabled}
            >
              {t.label}
            </Tab>
          ))}
        </Tabs>
      </div>
    );
  }
}
