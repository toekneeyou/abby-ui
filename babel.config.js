module.exports = function (api) {
  api.cache(false);
  const presets = ['module:@react-native/babel-preset'];
  const plugins = [['module:react-native-dotenv']];

  return {presets, plugins};
};
