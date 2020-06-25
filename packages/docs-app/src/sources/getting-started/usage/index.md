# Usage

You can use any of the components as demonstrated in the documentation.
Please refer to each component's [demo page](/demos/button) to see how they should be imported.

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

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
```

And add styles file to your <head> element.

```html
<link rel="stylesheet" href="https://unpkg.com/lib-react-components@latest/themes/default.css">
```

### Responsive meta tag

To ensure proper rendering and touch zooming for all devices, add the responsive viewport meta tag to your <head> element.

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width"
/>
```

