module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "eslint-config-prettier",
    "@vue/typescript/recommended"
  ],
  rules: {
    "vue/no-unused-vars": 0,
    "vue/no-mutating-props": 0,
    "vue/valid-v-on": 0,
    "no-undef": 0
  },
};
