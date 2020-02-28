module.exports = {
  extends: ['airbnb-typescript'],
  rules: {
    'react/prop-types': [
      2,
      {
        skipUndeclared: true,
      },
    ],
    'react/jsx-props-no-spreading': 0,
  },
};
