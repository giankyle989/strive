import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'], // Output as ES modules
  target: 'node20', // Adjust to your Node version
  outDir: 'dist',
  sourcemap: true,
  clean: true, // Clears dist before building
  splitting: false,
  dts: false, // Set to true if you want .d.ts files
  minify: false,
});
