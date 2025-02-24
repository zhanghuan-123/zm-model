module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/recommended", "eslint:recommended", "@vue/typescript/recommended"],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prefer-const": "off",
    "no-unused-expressions": 0,
    "@typescript-eslint/no-var-requires": 0,
    "vue/no-unused-vars": [
      "error",
      {
        ignorePattern: "^_"
      }
    ],
    "@typescript-eslint/interface-name-prefix": 0,
    camelcase: "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-non-null-assertion": "off"
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        mocha: true
      }
    }
  ],
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly"
  }
};
