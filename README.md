# Alternative UI
[![CircleCI](https://circleci.com/gh/PeculiarVentures/react-components.svg?style=svg&circle-token=e09e288d212560eb0fc4a250a0d9c05394df2c3b)](https://circleci.com/gh/PeculiarVentures/react-components)

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

## Documentation

Check out our [documentation website](https://peculiarventures.github.io/react-components/).

## Development

1. Install modules
```bash
npm install && cd app && npm install && cd ..
```

2. Build package and styles
```bash
npm run build && npm run theme:create
```

3. Start development server
```bash
npm run development
```

4. Open port `:3000`