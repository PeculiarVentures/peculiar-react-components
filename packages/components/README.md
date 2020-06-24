# `lib-react-components`

## Installation

To install and save in your `package.json` dependencies, run:

```bash
npm install lib-react-components
```

## Quick start

Here's a quick example to get you started, **it's literally all you need**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'lib-react-components';

const App = () => (
  <Button>
    I am Button
  </Button>
);

ReactDOM.render(<App />, document.querySelector('#root'));
```

And add styles file to your <head> element.

```html
<link rel="stylesheet" href="https://unpkg.com/browse/lib-react-components@latest/lib/themes/default.css">
```

### Responsive meta tag

To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your <head> element.

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width"
/>
```

## Documentation

Check out our [documentation website](https://peculiarventures.github.io/react-components/).

## Development Workflow

See [docs package](https://github.com/PeculiarVentures/react-components/tree/master/packages/docs).
