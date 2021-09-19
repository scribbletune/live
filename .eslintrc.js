module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:react/recommended',
    'plugin:import/recommended',
    // ? 'plugin:compat/recommended',
    // ? 'plugin:cypress/recommended',
    // ? 'plugin:jsx-a11y/strict',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'prettier', 'jest', 'import', 'compat', 'promise'],
  settings: {
    react: {
      version: 'detect',
    },
    polyfills: ['Promise', 'Array'],
  },
  rules: {
    'arrow-body-style': [2, 'as-needed'],
    'comma-dangle': 0,
    'compat/compat': 'warn',
    'consistent-return': 'warn',
    'dot-notation': 'off',
    'eol-last': 'warn',
    'func-names': 'warn',
    // ? import: 'warn',
    'import/extensions': 'warn',
    'import/prefer-default-export': 'warn',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['src/**/*.js', 'buildScripts/**/*.js', 'src/__tests__/**', '**/__tests__/**', '*.js'],
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'jsx-a11y/accessible-emoji': 0,
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        aspects: ['invalidHref'],
      },
    ],
    'jsx-a11y/href-no-has': 'off',
    'key-spacing': 'off',
    'max-len': 0,
    'no-console': 'off',
    'no-multi-spaces': 'off',
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-underscore-dangle': 0, // TODO
    'no-unused-vars': [
      1,
      {
        argsIgnorePattern: 'props|res|next|^err',
      },
    ],
    'no-var': ['error'],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 120,
        arrowParens: 'always',
        htmlWhitespaceSensitivity: 'strict',
        bracketSpacing: true,
        // jsxBracketSameLine: false,
        proseWrap: 'always',
        semi: true,
        tabWidth: 2,
        useTabs: false,
      },
    ],
    'quote-props': 'warn',
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    radix: 'warn',
    'no-shadow': [
      2,
      {
        hoist: 'all',
        allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/display-name': [
      1,
      {
        ignoreTranspilerName: false,
      },
    ],
    'react/forbid-prop-types': 0, // TODO: 'react/forbid-prop-types': 'warn',
    'react/jsx-no-bind': [
      'error',
      {
        ignoreRefs: true,
        allowArrowFunctions: false,
        allowFunctions: false,
        allowBind: false,
        ignoreDOMComponents: false,
      },
    ],
    'react/no-unescaped-entities': 'warn',
    'react/prefer-stateless-function': [
      1,
      {
        ignorePureComponents: true,
      },
    ],
    'react/prop-types': 0, // TODO: either TypeScript, or 'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'warn',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    semi: 'warn',
    'space-before-function-paren': 'off',
    'spaced-comment': 'warn',
  },
};
