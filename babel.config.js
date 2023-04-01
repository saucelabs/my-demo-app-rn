module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    // For Reanimated
    // Always needs to be added last
    'react-native-reanimated/plugin',
  ],
};
