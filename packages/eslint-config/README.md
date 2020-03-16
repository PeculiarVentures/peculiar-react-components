# ESLint configuration

## Installation

```bash
npm install @peculiar/eslint-config --save-dev
```

## Usage

`.eslintrc.js`
```js
module.exports = {
  extends: ['@peculiar/eslint-config'],
};
```

`.eslintrc.js` (without React)
```js
module.exports = {
  extends: ['@peculiar/eslint-config/base'],
};
```

`package.json`
```json
{
  "scripts": {
    "lint": "eslint --ext .js,.jsx,.ts,.tsx ./"
  }
}
```