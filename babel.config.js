module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'transform-inline-environment-variables',
      {
        include: ['TESTFAIRY_TOKEN'],
      },
    ],
    // For Reanimated
    // Always needs to be added last
    'react-native-reanimated/plugin',
  ],
};
