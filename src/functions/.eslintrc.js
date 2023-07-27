/* eslint-disable quote-props */
module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'no-restricted-globals': ['error', 'name', 'length'],
    'prefer-arrow-callback': 'error',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    camelcase: 'off',
    'no-useless-return': 'off',
    'max-len': 'off',
    'no-empty-pattern': 'off',
    indent: 'off',
    'comma-dangle': 'off',
    'operator-linebreak': 'off',
    'arrow-parens': 'off',
  },
  overrides: [
    {
      files: ['**/*.spec.*'],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
