import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  server: { host: true },
  plugins: [
    react({ babel: { plugins: ['babel-plugin-react-compiler'] } }),
    nodePolyfills({ globals: { buffer: true } }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
  },
});
