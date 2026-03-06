import type { ESLint, Linter } from 'eslint'
import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'
import prettierPlugin from 'eslint-plugin-prettier'

const rocketseatConfig = require('@rocketseat/eslint-config/react.js')

const jsxA11yPlugin = require('eslint-plugin-jsx-a11y')

const config: Linter.Config[] = [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin as unknown as ESLint.Plugin,
      react: reactPlugin as unknown as ESLint.Plugin,
      'react-hooks': hooksPlugin as unknown as ESLint.Plugin,
      '@typescript-eslint': tsPlugin as unknown as ESLint.Plugin,
      prettier: prettierPlugin as unknown as ESLint.Plugin,
      'jsx-a11y': jsxA11yPlugin as unknown as ESLint.Plugin,
    },
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...(reactPlugin.configs['jsx-runtime'] as unknown as Linter.Config).rules,
      ...hooksPlugin.configs.recommended.rules,
      ...(rocketseatConfig.rules ?? {}),
      '@next/next/no-img-element': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
]

export default config
