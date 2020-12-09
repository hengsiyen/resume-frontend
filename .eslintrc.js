module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'eslint-disable-next-line require-await': 'off',
    'eslint-disable-next-line no-unused-expressions': 'off',
    'eslint-disable-next-line camelcase': 'off',
    'eslint-disable-next-line nuxt/no-cjs-in-config': 'off',
    'eslint-disable-next-line vue/require-valid-default-prop': 'off',
    'eslint-disable-next-line vue/return-in-computed-property': 'off'
  }
}
