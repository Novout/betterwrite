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
    "vue/valid-v-for": 0,
    "vue/require-default-prop": 0,
    "@typescript-eslint/no-empty-function": 0,
    "no-undef": 0
  },
};
