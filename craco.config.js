// const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");

module.exports = {
  webpack: {
    // eslint-disable-next-line no-unused-vars
    configure: (webpackConfig, { env, paths }) => {
      // Overrides
      webpackConfig.module.rules.splice(
        1,
        0,
        // This override is added for debugging sources in node_modules under VSCode,
        // Specifically, Tone.js (it could be expanded to other packages).
        // Without it VSCode debugger line numbers don't align (despite them being fixed earlier, something broke lately).
        // https://github.com/facebook/create-react-app/issues/6044
        // need to execute `npm i -D source-map-loader@^1.1.3` in the app project for this to work correctly.
        // Further, latest source-map-loader that promises more fixes won't work, as it requires webpack@5,
        // which react currently can't work with.
        {
          test: /\.(js|mjs|jsx)$/,
          include: paths.appPath.split('\\').slice(0, -1).join('\\') || paths.appPath.split('/').slice(0, -1).join('/'), // For storybook to continue working, must have 'include' property.
          enforce: 'pre',
          use: [
            {
              loader: 'source-map-loader',
              options: {
                filterSourceMappingUrl: (url, resourcePath) => {
                  let res = true;
                  if (/Tone\.js$/i.test(resourcePath)) {
                    res = false;
                  }
                  if (/scribbletune\\\\index\.js$/i.test(resourcePath)) {
                    res = false;
                  }
                  if (/scribbletune\\\\browser\.js$/i.test(resourcePath)) {
                    res = false;
                  }
                  //  res = false;

                  if (res !== true)
                    console.log('DEBUG: craco.config.js: url=%o resourcePath=%o res=%o', url, resourcePath, res);
                  return res;
                  // return values:
                  // true or 'consume' - consume the source map and remove SourceMappingURL comment (default behavior)
                  // false or 'remove' - do not consume the source map and remove SourceMappingURL comment
                  // 'skip' - do not consume the source map and do not remove SourceMappingURL comment
                },
              },
            },
          ],
        }
      );

      console.log('DEBUG: env=%o paths=%o craco.config.js: webpackConfig=%o', env, paths, webpackConfig);
      return webpackConfig;
    },
  },
};
