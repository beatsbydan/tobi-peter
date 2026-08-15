import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettierConfig from 'eslint-config-prettier'

export default [
  { ignores: ['build', 'dist', '.dist', 'node_modules', 'coverage'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // React 19 automatic JSX runtime — no need for `import React` in scope.
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      // Without this, core no-unused-vars can't see that a component used only in JSX
      // (e.g. `import Foo from ...` + `<Foo/>`) is actually referenced.
      'react/jsx-uses-vars': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/no-unknown-property': 'error',
      // eslint-plugin-react-hooks v7's "recommended" set is built for React Compiler adoption
      // (static-components, immutability, purity, etc.) which this codebase doesn't use yet —
      // only enable the two classic hook-correctness rules to avoid an unrelated flood of errors.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // jsx-a11y's recommended rules are all "error" by default, but this codebase has known,
      // already-planned a11y debt (custom Dropdown/RadioButton/modal built on non-semantic divs).
      // Keep them visible as warnings for now; they get promoted to "error" per area as the
      // Tailwind/admin-redesign phases land real fixes, instead of failing CI on day one.
      ...Object.fromEntries(
        Object.entries(jsxA11y.configs.recommended.rules).map(([rule, config]) => {
          const isArray = Array.isArray(config)
          const severity = isArray ? config[0] : config
          if (severity !== 'error') return [rule, config]
          const downgraded = isArray ? ['warn', ...config.slice(1)] : 'warn'
          return [rule, downgraded]
        }),
      ),
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['src/**/*.{js,jsx}'],
    ...reactRefresh.configs.vite,
  },
  {
    files: ['src/Scripts/**/*.js', 'vite.config.js', 'eslint.config.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  prettierConfig,
]
