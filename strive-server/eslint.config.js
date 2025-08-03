// eslint.config.js
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
      globals: {
        console: true,
        process: true,
      },
      ecmaVersion: 2020,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
    },
    rules: {
      // ESLint base rules
      semi: ['error', 'always'],
      quotes: ['error', 'single'],

      // TypeScript-specific
      '@typescript-eslint/no-explicit-any': 'warn',

      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // Integrate Prettier rules
      'prettier/prettier': 'error',
    },
  },
];
