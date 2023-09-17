module.exports = {
  plugins: [
    'prettier-plugin-style-order',
    'prettier-plugin-organize-imports',
    'prettier-plugin-jsdoc', // MUST come second last.
    'prettier-plugin-tailwindcss', // MUST come last.
  ],
  tailwindConfig: './packages/tailwind-config/tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cva'],
  // Add rules below...
  printWidth: 100,
  semi: false,
  singleQuote: true,
}
