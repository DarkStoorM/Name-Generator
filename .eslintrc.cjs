module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', '@typescript-eslint', 'import', 'unused-imports'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'unused-imports/no-unused-imports-ts': 2,
    'no-eval': 2,
    'no-implicit-coercion': 2,
    'radix': 2,
    'yoda': 2,
    'no-useless-catch': 2,
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', 'index', 'sibling', 'parent'],
        'alphabetize': {
          'order': 'asc'
        }
      }
    ],
    'array-element-newline': [
      'error',
      {
        'ArrayExpression': 'consistent',
        'ArrayPattern': { 'minItems': 3 }
      }
    ]
  }
}
