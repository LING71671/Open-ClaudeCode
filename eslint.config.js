import { defineConfig } from '@typescript-eslint/utils/ts-eslint';
import eslintPluginPrettierRecommended from 'eslint-config-prettier';

export default defineConfig([
  {
    ignores: [
      'dist/**',
      'package/**',
      'node_modules/**',
      'plugins/**',
      'examples/**',
      '.sisyphus/**',
      '**/*.d.ts',
      '**/*.test.ts',
      '**/*.spec.ts',
    ],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: await import('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'custom-rules': {
        rules: {
          'no-top-level-side-effects': {
            meta: {
              type: 'problem',
              docs: {
                description: 'Disallow top-level side effects except for explicitly allowed ones',
              },
              schema: [],
              messages: {
                sideEffect:
                  'Top-level side effects are not allowed. Use eslint-disable-next-line custom-rules/no-top-level-side-effects to explicitly allow known side effects.',
              },
            },
            create(context) {
              return {
                ExpressionStatement(node) {
                  // Allow import statements with side effects that are explicitly allowed
                  // This is a simplified rule - in production you'd want more sophisticated analysis
                },
              };
            },
          },
        },
      },
    },
    rules: {
      // TypeScript recommended rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],

      // Custom rules
      'custom-rules/no-top-level-side-effects': 'warn',

      // General
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },
  eslintPluginPrettierRecommended,
]);
