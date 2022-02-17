module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    tinymce: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",
    "vue/no-unused-components": "warn",
    "no-undef": "warn",
    // 传递给prettier的选项
    // https://github.com/prettier/eslint-plugin-prettier#options
    "prettier/prettier": ["warn", {
      "htmlWhitespaceSensitivity": "ignore"
    }],
  },
};
