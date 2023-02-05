// eslint-disable-next-line no-undef
module.exports = {
   env: {
      browser: true,
      es2021: true,
   },
   extends: ['eslint:recommended', 'plugin:react/recommended'],
   overrides: [],
   parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   plugins: ['react'],
   rules: {
      eqeqeq: 1,
      strict: 0,
      'no-unused-vars': 1,
      'react/no-unknown-property': [1, { ignore: ['css'] }],
      'react/react-in-jsx-scope': 0,
      'react/jsx-uses-react': 0,
      'react/prop-types': 0
   },
};
