# Alternative UI
[![CircleCI](https://circleci.com/gh/pentatonica/lib-react-components.svg?style=shield&circle-token=cd2f63c1aa99c49819bfa4f6c9555131fb6e1a2f)](https://circleci.com/gh/pentatonica/lib-react-components)

## Install
```bash
npm install lib-react-components --save
```

## Use components
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

ReactDOM.render(<App />, document.getElementById('#root'));
```
