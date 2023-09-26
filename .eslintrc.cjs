module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['productsway/react'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', 'vitest.config.ts', '__tests__'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  rules: {},
};
