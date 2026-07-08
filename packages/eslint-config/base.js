import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export const importSortGroups = [
  ['^\u0000'],
  ['^node:', '^[a-z]'],
  ['^@(?!/)'],
  ['^@/'],
  ['^\\.\\.'],
  ['^\\./'],
  ['^.+\\.s?css$'],
];

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'simple-import-sort/imports': ['error', { groups: importSortGroups }],
      'simple-import-sort/exports': 'error',
      'object-curly-spacing': ['error', 'always'],
      'comma-spacing': ['error', { before: false, after: true }],
    },
  }
)
