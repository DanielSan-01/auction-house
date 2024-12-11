import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
  },
  css: {
    postcss: './postcss.config.cjs',
  },
});
