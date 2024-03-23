module.exports = function (api) {
  api.cache(false);
  const presets = ['module:@react-native/babel-preset'];
  const plugins = [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@features': './src/features',
          '@screens': './src/screens',
          '@services': './src/services',
          '@store': './src/store',
          '@styles': './src/styles',
          '@types': './src/types',
          '@hooks': './src/hooks',
        },
      },
    ],
  ];

  return {presets, plugins};
};
