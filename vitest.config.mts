/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths() // Использует алиасы из tsconfig.json
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // Дополнительно, чтобы точно работало
    }
  },
  test: {
    include: ["tests/**/*.{test,spec}.{ts,tsx}"], // Тесты в папке tests
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts", // Файл глобальной настройки
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
