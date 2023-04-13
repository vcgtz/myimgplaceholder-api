module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard-with-typescript',
    'prettier'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    semi: ['error', 'always'],
    '@typescript-eslint/strict-boolean-expressions': ['error', { allowNullableString: true }],
  }
};
