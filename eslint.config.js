const babelParser = require('@babel/eslint-parser');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const prettier = require('eslint-plugin-prettier');
const react = require('eslint-plugin-react');

module.exports = [
  {
    ignores: ['.cache/**', 'public/**', 'node_modules/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {},
      },
      globals: {
        browser: 'readonly',
        console: 'readonly',
        document: 'readonly',
        global: 'readonly',
        module: 'readonly',
        process: 'readonly',
        require: 'readonly',
        window: 'readonly',
      },
    },
    plugins: {
      'jsx-a11y': jsxA11y,
      prettier,
      react,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
      strict: 'off',
      quotes: ['warn', 'single'],
      'prettier/prettier': 'warn',
      'react/prop-types': 'warn',
      'no-unused-vars': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];