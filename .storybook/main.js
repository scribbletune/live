module.exports = {
  stories: [
    // '../src/**/*.stories.mdx',
    // '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/*.stories.js',
    // '../src/components/**/*.stories.js',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ]
}
