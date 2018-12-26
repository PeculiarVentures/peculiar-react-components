# Usage

You can use any of the components as demonstrated in the documentation.
Please refer to each component's [demo page](/demos/button) to see how they should be imported.

## Quick start

Here's a quick example to get you started, **it's literally all you need**:

Add styles file to your html:
```html
<link rel="stylesheet" href="path/to/css/theme/file">
```

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'lib-react-components';

function App() {
  return (
    <Button>
      I am Button
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
```
