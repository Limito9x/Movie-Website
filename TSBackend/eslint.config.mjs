// eslint.config.mjs

import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierConfig from "eslint-config-prettier";

export default [
  // Cấu hình chung cho tất cả các file trong dự án
  {
    ignores: [
      "dist/", // Bỏ qua thư mục chứa code đã biên dịch
      "node_modules/",
    ],
  },

  // Cấu hình cho file TypeScript
  {
    files: ["**/*.ts", "**/*.tsx"], // Áp dụng cho các file .ts và .tsx
    languageOptions: {
      parser: tsParser, // Sử dụng parser của TypeScript
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module", // Sử dụng ES Modules
      },
      globals: {
        ...globals.node, // Thêm các biến toàn cục của Node.js
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin, // Kích hoạt plugin TypeScript
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Bật các quy tắc khuyến nghị của TypeScript
      // Thêm các quy tắc tùy chỉnh của bạn ở đây
      "@typescript-eslint/no-unused-vars": "warn", // Cảnh báo khi có biến không dùng
      "@typescript-eslint/no-explicit-any": "warn", // Cảnh báo khi dùng 'any'
    },
  },

  // Vô hiệu hóa các quy tắc định dạng của ESLint để tránh xung đột với Prettier
  prettierConfig,
];
