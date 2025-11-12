import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // Disallow console statements
      "no-console": "error",
      
      // Unused variables
      "@typescript-eslint/no-unused-vars": "off", // Turn off to use unused-imports plugin
      "@typescript-eslint/no-require-imports": "off", // Allow require imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  // Ignore specific files or directories
  {
    ignores: ["node_modules/", "dist/", ".next/", ".vercel/"],
  },
];

export default eslintConfig;
