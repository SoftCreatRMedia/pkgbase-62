import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ["**/*.js", "**/extra", "node_modules/**/*", "eslint.config.mjs"],
    },
    ...compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
    ),
    {
        plugins: {
            "@typescript-eslint": typescriptEslint,
        },

        languageOptions: {
            parser: tsParser,
            ecmaVersion: 5,
            sourceType: "script",

            parserOptions: {
                tsconfigRootDir: __dirname,
                project: ["./tsconfig.json"],
            },
        },

        rules: {
            curly: ["error", "all"],
            "lines-between-class-members": ["error", "always"],
            "padding-line-between-statements": [
                "error",
                {
                    blankLine: "always",
                    prev: "*",
                    next: ["return", "throw", "break", "continue", "if", "for", "while", "do", "switch", "try"],
                },
                { blankLine: "always", prev: "block-like", next: "*" },
                { blankLine: "always", prev: "*", next: ["function", "class", "export"] },
                { blankLine: "always", prev: ["function", "class", "import"], next: "*" },
                { blankLine: "any", prev: "import", next: "import" },
                { blankLine: "always", prev: ["const", "let", "var"], next: "expression" },
                { blankLine: "always", prev: "expression", next: ["const", "let", "var"] },
            ],
            "@typescript-eslint/no-explicit-any": 0,
            "@typescript-eslint/no-non-null-assertion": 0,
            "@typescript-eslint/no-unsafe-argument": 0,
            "@typescript-eslint/no-unsafe-assignment": 0,
            "@typescript-eslint/no-unsafe-call": 0,
            "@typescript-eslint/no-unsafe-member-access": 0,
            "@typescript-eslint/no-unsafe-return": 0,

            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],

            "@typescript-eslint/no-misused-promises": [
                "error",
                {
                    checksVoidReturn: false,
                },
            ],
            "@typescript-eslint/prefer-promise-reject-errors": ["error", { allowEmptyReject: true }],
        },
    },
];
