# Karma scripts

## Installation

```bash
npm install @peculiar/karma-scripts --save-dev
```

## Usage

`karma.conf.js`
```js
const { createKarmaConfig } = require('@peculiar/karma-scripts');

module.exports = (config) => {
  const baseConfig = createKarmaConfig({
    dirname: __dirname,
    coverageExcludes: [],
  });

  config.set(baseConfig);
  config.set({
    // overrides here
  });
};
```

`test/index.ts`
```ts
import '../src/my.spec';
```

`test/index.ts` (with React)
```ts
import '@peculiar/karma-scripts/enzymeAdapter';

import '../src/my.spec';
```

`package.json`
```json
{
  "scripts": {
    "test:karma": "karma start",
    "test:karma:debug": "karma start --single-run=false --reporters=mocha --debug"
  }
}
```
