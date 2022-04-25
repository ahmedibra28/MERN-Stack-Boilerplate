module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/react-in-jsx-scope': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    'react/prop-types': 'off',
  },
}
