module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:jsx-control-statements/recommended'],
  rules: {
    semi: ['error', 'never'],
    'react/jsx-no-undef': [2, { allowGlobals: true }],
  },
}
