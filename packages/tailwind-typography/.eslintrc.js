module.exports = {
  extends: ['custom/library'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    // Doesn't seem to work correctly with nullish coalescing.
    '@typescript-eslint/no-unnecessary-condition': 'off',
  },
}
