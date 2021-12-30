module.exports = {
  extends: ['@react-native-community', 'plugin:wdio/recommended'],
  globals: {
    WebdriverIO: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'wdio'],
  root: true,
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
};
