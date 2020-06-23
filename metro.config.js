/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    resolver: {
      assetExts: [assetExts, 'txt', 'png', 'jpg', 'pb', 'tflite', 'jpeg'],
      sourceExts: [...sourceExts, 'txt', 'png', 'jpg', 'pb', 'tflite'],
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
  };
})();