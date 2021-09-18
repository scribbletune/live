// Presents all js files found using pattern match in a data structure
// Uses Webpack

// 'use strict';

// const debug = require('debug')('ldecode:decoder');
// debug.enabled = true;

window.TrackLoadMethods = {
  // Mechanism for the loadable track file to deliver its functions
  sectionName: 'track',
};

// requires and returns all modules that match given context
function requireAll(requireContext, requireContextRaw, exclude, include) {
  let names = requireContext.keys();
  // ? const namesRaw = requireContextRaw.keys();
  exclude?.forEach((pattern) => {
    names = names.filter((name) => !name.match(pattern));
  });
  include?.forEach((pattern) => {
    names = names.filter((name) => name.match(pattern));
  });

  // TODO: Implement lazy-loading of example track files contents
  // (export names array only and requireContext / requireContextRaw for UI meny, upon selection load and return data and source)
  return names.map((name) => {
    const sectionName = `_embedded_${name}`;
    window.TrackLoadMethods.sectionName = sectionName;
    const module = requireContext(name);
    const data = window.TrackLoadMethods[sectionName]; // will receive file data
    let text;
    try {
      text = requireContextRaw(name).default; // for Webpack v4 only: `npm i -D raw-loader` + webpack custom config - loads file source
      // TODO: (for Webpack@5) raw-loader deprecated for v5 - change to asset modules: `${name}?raw` and custom webpack config for raw using one of asset loader wrbpack custom configs.
    } catch (e) {
      console.error(
        `Fail loading file "${name}" source, saving and code editor will not work.`
        // `Check webpack is v4 and raw-loader configuration is present.`
      );
    }
    return { module, text, data, name: name.split('/').slice(-1) };
  });
}

// Find all .js files except...
const allTrackFiles = requireAll(
  require.context('./', false, /^\.\/(?!index).*\.js$/), // Can't use variables in require.context()!
  require.context('!!raw-loader!./', false, /^\.\/(?!index).*\.js$/) // Can't use variables in require.context()!
);
export default allTrackFiles;
