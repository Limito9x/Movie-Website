import globals from "globals";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module", // Sử dụng ES Modules
      globals: {
        ...globals.node, // Đặt biến toàn cục cho Node.js
      },
    },
    rules: {
      // Các quy tắc khác
    },
  },
];
