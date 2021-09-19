module.exports = {
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "eslint-config-prettier",
  ],
  rules: {
    "vue/no-unused-vars": 2,
  },
};
