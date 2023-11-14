module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "boundaries"],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    "boundaries/include": ["src/**/*"],
    "boundaries/elements": [
      {
        type: "app",
        pattern: "app",
      },
      {
        type: "pages",
        pattern: "src/pages/*",
        capture: ["page"],
      },
      {
        type: "widgets",
        pattern: "widgets/*",
        capture: ["widget"],
      },
      {
        type: "features",
        pattern: "features/*/*",
        capture: ["group", "feature"],
      },
      {
        type: "entities",
        pattern: "entities/*",
        capture: ["entity"],
      },
      {
        type: "shared",
        pattern: "shared/*",
        capture: ["segment"],
      },
    ],
  },
  rules: {
    "react-refresh/only-export-components": 0,
    "boundaries/entry-point": [
      2,
      {
        default: "disallow",
        rules: [
          {
            target: [
              [
                "shared",
                {
                  segment: "lib",
                },
              ],
            ],
            allow: "*/index.ts",
          },
          {
            target: [
              [
                "shared",
                {
                  segment: "lib",
                },
              ],
            ],
            allow: "*.(ts|tsx)",
          },
          {
            target: [
              [
                "shared",
                {
                  segment: "constants",
                },
              ],
            ],
            allow: "index.ts",
          },
          {
            target: [
              [
                "shared",
                {
                  segment: "ui", // ("ui"|"constants")
                },
              ],
            ],
            allow: "**",
          },
          {
            target: ["app", "pages", "widgets", "features", "entities"],
            allow: "index.(ts|tsx)",
          },
        ],
      },
    ],
    "boundaries/element-types": [
      2,
      {
        default: "allow",
        message: "${file.type} is not allowed to import (${dependency.type})",
        rules: [
          {
            from: ["shared"],
            disallow: ["app", "pages", "widgets", "features", "entities"],
            message:
              "Shared module must not import upper layers (${dependency.type})",
          },
          {
            from: ["entities"],
            message: "Entity must not import upper layers (${dependency.type})",
            disallow: ["app", "pages", "widgets", "features"],
          },
          {
            from: ["entities"],
            message: "Entity must not import other entity",
            disallow: [
              [
                "entities",
                {
                  entity: "!${entity}",
                },
              ],
            ],
          },
          {
            from: ["features"],
            message:
              "Feature must not import upper layers (${dependency.type})",
            disallow: ["app", "pages", "widgets"],
          },
          {
            from: ["features"],
            message: "Feature must not import other feature",
            disallow: [
              [
                "features",
                {
                  feature: "!${feature}",
                },
              ],
            ],
          },
          {
            from: ["widgets"],
            message:
              "Feature must not import upper layers (${dependency.type})",
            disallow: ["app", "pages"],
          },
          {
            from: ["widgets"],
            message: "Widget must not import other widget",
            disallow: [
              [
                "widgets",
                {
                  widget: "!${widget}",
                },
              ],
            ],
          },
          {
            from: ["pages"],
            message: "Page must not import upper layers (${dependency.type})",
            disallow: ["app"],
          },
          {
            from: ["pages"],
            message: "Page must not import other page",
            disallow: [
              [
                "pages",
                {
                  page: "!${page}",
                },
              ],
            ],
          },
        ],
      },
    ],
  },
};
