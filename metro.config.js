// Learn more https://docs.expo.io/guides/customizing-metro
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { getDefaultConfig } = require('expo/metro-config');

// eslint-disable-next-line no-undef
module.exports = async () => {
    const {
        resolver: { sourceExts, assetExts },
        // eslint-disable-next-line no-undef
    } = await getDefaultConfig(__dirname);

    return {
        transformer: {
            // eslint-disable-next-line no-undef
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
        },
        resolver: {
            assetExts: assetExts.filter((ext) => ext !== 'svg'),
            sourceExts: [...sourceExts, 'svg'],
        },
    };
};
