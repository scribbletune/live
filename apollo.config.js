const path = require('path');

module.exports = {
  client: {
    service: {
      // name: 'my-graphql-app',
      // name: 'my-graphql-app@master',
      name: 'my-graphql-app@current', // some discussions suggest @current removes error in apollo devtools
      // localSchemaFile: './src/local-schema.graphql',
      localSchemaFile: path.resolve(__dirname, './src/local-schema.graphql'),
      endpoint: null, // Undocumented, lets apollo devtools to back off looking for server.
    },
    includes: ['./src/**/*.js'],
    excludes: ['**/__tests__/**'],
  },
};

console.log('module.exports=%o', module.exports);
