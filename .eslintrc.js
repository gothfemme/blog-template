const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ["plugin:jsx-a11y/recommended", "next/core-web-vitals", "prettier"],
  globals: {
    React: true,
    JSX: true,
  },
  // Report unused `eslint-disable` comments.
  reportUnusedDisableDirectives: true,
  // Tell ESLint not to ignore dot-files, which are ignored by default.
  ignorePatterns: ["!.*.js"],
  // Global settings used by all overrides.
  settings: {
    // Use the Node resolver by default.
    "import/resolver": { node: {} },
  },
  // Global parser options.
  parserOptions: {
    ecmaVersion: "2021",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.tsx", "*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project,
      },
      settings: {
        "import/resolver": {
          typescript: {
            project,
          },
        },
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/strict",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "plugin:import/typescript",
        "prettier",
      ],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unnecessary-condition": "warn",
      },
    },
    {
      files: ["*.mdx"],
      parser: "eslint-mdx",
      extends: ["plugin:mdx/recommended"],
      rules: {
        "react/jsx-no-undef": 0,
      },
      settings: {
        "mdx/code-blocks": false,
        // optional, if you want to disable language mapper, set it to `false`
        // if you want to override the default language mapper inside, you can provide your own
        // "mdx/language-mapper": {},
      },
    },
  ],
  rules: {
    "arrow-body-style": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "react/prop-types": "off",
    "react/jsx-pascal-case": ["error", { allowAllCaps: false }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/first": "error",
    "import/newline-after-import": "warn",
    "import/no-absolute-path": "error",
    "import/no-cycle": "error",
    "import/no-extraneous-dependencies": ["error", { includeTypes: true }],
    "import/no-mutable-exports": "error",
    "import/no-relative-packages": "warn",
    "import/no-self-import": "error",
    "import/no-useless-path-segments": ["error"],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin", // Node.js built-in modules
          "external", // Packages
          "internal", // Aliased modules
          "parent", // Relative parent
          "sibling", // Relative sibling
          "index", // Relative index
        ],
        "newlines-between": "always",
      },
    ],
  },
  ignorePatterns: ["node_modules/", "dist/"],
};
