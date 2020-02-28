# React components

## Installation

```bash
npm install @pv/react-components
```

## Usage

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from '@pv/react-components';

const App = () => (
  <Button>
    I am Button
  </Button>
);

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
```