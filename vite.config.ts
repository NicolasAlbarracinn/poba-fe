/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    globals: true,
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      exclude: [
        ...configDefaults.exclude,
        'src/mocks/**',
        'src/theme/**',
        'src/interfaces/**',
        '**/types.*',
        '**/store/**/RootState*',
        'src/components/styled/**',
        'src/assets/**',
        '**/*Styles.ts',
      ],
    },
  },
});
