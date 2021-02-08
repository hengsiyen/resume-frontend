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
    'require-await': 'off',
    'no-unused-expressions': 'off',
    'nuxt/no-cjs-in-config': 'off',
    'vue/require-valid-default-prop': 'off',
    'vue/return-in-computed-property': 'off',
    'no-undef': 'off',
    camelcase: 'off',
    'no-console': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-v-html': 'off',
    'vue/attributes-order': 'off',
    'vue/no-template-shadow': 'off',
    'no-prototype-builtins': 'off',
    'no-unused-vars': 'off',
    'vue/order-in-components': 'off',
    'no-lonely-if': 'off'
  }
}
