module.exports = {
  extends: [
    'stylelint-config-sass-guidelines',
    // 'stylelint-config-standard',
    'stylelint-config-prettier', // Must be last
  ],
  ignoreFiles: [
    './coverage/**/*',
    './dist/**/*',
    './node_modules/**/*',
    './public/**/*',
    './src/**/__snapshots__ /**/*',
    '**/*.js',
    '**/*.jsx',
  ],
  rules: {
    indentation: 2,
    'max-nesting-depth': 2,

    // stylelint-config-sass-guidelines requires
    // you to omit the '.scss' ending in @import statements. But in combination
    // with webpack we still need it.
    'scss/at-import-partial-extension-blacklist': null,

    // Enforce BEM class patterns, inspired by
    // - https://github.com/simonsmith/stylelint-selector-bem-pattern/issues/23#issuecomment-279216443
    // - https://github.com/bjankord/stylelint-config-sass-guidelines/issues/20#issuecomment-349972873
    // probably it can be achieved with them too:
    // - https://github.com/simonsmith/stylelint-selector-bem-pattern
    // - https://github.com/postcss/postcss-bem-linter
    // 'selector-class-pattern':
    //   '^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+ (?: -[a - zA - Z0 - 9] +) * (?: __[a - zA - Z0 - 9] + (?: -[a - zA - Z0 - 9] +) *) ? (?: --[a - zA - Z0 - 9] + (?: -[a - zA - Z0 - 9] +) *) ? (?: \\[.+\\])?$',

    // Overrides
    'selector-no-qualifying-type': null,
    'selector-max-id': 1,
  },
};
