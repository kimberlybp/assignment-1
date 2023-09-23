module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-continue': 'off',
    'no-param-reassign': 'off',
    'no-fallthrough': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'prefer-destructuring': 'off',
    'arrow-body-style': ['off'],
    'func-names': 'off',
    'import/prefer-default-export': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 0,
    "jsx-a11y/control-has-associated-label": 0,
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': ['error', { 'extensions': ['.tsx'] }],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    'import/extensions': ['error', {
      min: 'ignorePackages',
      js: 'ignorePackages',
      ts: 'never',
      tsx: 'never',
    }],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {'ts-ignore': 'allow-with-description'},
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/ignore': [
      'node_modules',
      '.json',
    ],
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    },
  },
}
