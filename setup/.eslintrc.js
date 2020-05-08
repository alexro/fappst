module.exports = {
  parser: "babel-eslint",

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/react"
  ],

  plugins: ["react"],

  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },

  settings: {
    react: {
      pragma: "React",
      version: "16.2"
    }
  },

  env: {
    browser: true,
    es6: true,
    amd: true
  },

  rules: {
    "react/no-unescaped-entities": 1
  },

  overrides: [
    {
      files: ["*.spec.js", "*.test.js"],
      env: {
        mocha: true
      },
      globals: {
        __BASE_AXIOS_URL__: true,
        expect: true,
        mount: true,
        shallow: true,
        sinon: true,
        testUtils: true
      }
    }
  ]
};
