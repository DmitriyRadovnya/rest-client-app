/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  test: {
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
         '**/layout.tsx',
        '**/theme.ts',
        '**/route.ts',
        '**/node_modules/**',
        '**/tests/**',
        '**/.next/**',
        '**/%5Bturbopack%5D_runtime.js',
        "eslint.config.mjs",
        "**/*.d.ts",
        "next-env.d.ts",
        "next.config.ts",
        "vitest.config.mts",
        "middleware.ts",
        "src/lib/providers/**",
        "src/lib/static/**",
        "src/lib/utils/**",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
