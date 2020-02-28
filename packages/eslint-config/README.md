# ESLint configuration

## Installation

```bash
npm install @pv/eslint-config --save-dev
```

## Usage

`.eslintrc.js`
```js
module.exports = {
  extends: ['@pv/eslint-config'],
};
```

## Usage (without React)

`.eslintrc.js`
```js
module.exports = {
  extends: ['@pv/eslint-config/base'],
};
```

## Usage (package.json)

```json
{
  "scripts": {
    "lint": "eslint --ext .js,.jsx,.ts,.tsx ./"
  }
}
```