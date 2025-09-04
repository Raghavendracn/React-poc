module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Global Team Rules
    'no-console': 'error',
    'no-unused-vars': 'error',
    'no-debugger': 'error',
    'no-undef': 'error',
    
    // Additional quality rules
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': 'error'
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/'
  ]
};
