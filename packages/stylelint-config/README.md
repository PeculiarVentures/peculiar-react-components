# StyleLint configuration

## Installation

```bash
npm install @peculiar/stylelint-config --save-dev
```

## Usage

`.stylelintrc.js`
```js
module.exports = {
  extends: ['@peculiar/stylelint-config'],
};
```

`package.json`
```json
{
  "scripts": {
    "lint": "stylelint '**/*.scss'"
  }
}
```