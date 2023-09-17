import { buildTypographyVariant, typography } from 'tailwind-typography'
import type { Config } from 'tailwindcss'
import * as colors from './colors'

const breakpoints = {
  keys: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
  values: {
    xs: 0,
    sm: 700,
    md: 1000,
    lg: 1300,
    xl: 1600,
  },
}

const fontPrimary = 'Untitled Sans, sans-serif'
const fontSecondary = 'Dharma Gothic E, sans-serif'

const allCaps = {
  textTransform: 'uppercase',
}

const config: Config = {
  content: [
    // TODO: Figure out why turborepo setup with local import doesn't work. Refuses to generate classes.
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // '../../apps/*/src/**/*.{js,ts,jsx,tsx,mdx}',
    // '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-color-scheme="dark"]'],
  theme: {
    fontFamily: {
      primary: fontPrimary,
      secondary: fontSecondary,
    },
    screens: {
      ...Object.entries(breakpoints.values).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: `${value}px` }),
        {},
      ),
    },
    extend: {
      colors: {
        /** COLORS */

        ...colors,

        /** PALETTE */

        /* The colors used to represent primary interface elements for a user. */
        primary: {
          DEFAULT: colors.red[500],
          light: colors.red[400],
          dark: colors.red[600],
          contrast: colors.common.white,
        },
        /* The colors used to represent secondary interface elements for a user. */
        secondary: {
          DEFAULT: colors.beige[500],
          light: colors.beige[300],
          dark: colors.beige[700],
          contrast: colors.common.black,
        },
        /* The colors used to indicate the successful completion of an action that user triggered. */
        success: {
          DEFAULT: '#4caf50',
          contrast: colors.common.black,
        },
        /* The colors used to represent potentially dangerous actions or important messages. */
        warning: {
          DEFAULT: '#ff9800',
          contrast: colors.common.black,
        },
        /* The colors used to represent interface elements that the user should be made aware of. */
        error: {
          DEFAULT: '#f44336',
          contrast: colors.common.black,
        },
        /* The colors used to present information to the user that is neutral and not necessarily important. */
        info: {
          DEFAULT: '#546e7a',
          contrast: colors.common.white,
        },
        /* The colors used to indicate products on sale. */
        sale: {
          DEFAULT: '#d32f2f',
          contrast: colors.common.white,
        },

        /** LIGHT/DARK REACTIVE PALETTE */

        /* The colors used to represent plain interface elements for a user. */
        default: {
          DEFAULT: 'var(--palette-default)',
          light: 'var(--palette-default-light)',
          dark: 'var(--palette-default-dark)',
          contrast: 'var(--palette-default-contrast)',
        },
        /* The colors used to style the text. */
        text: {
          primary: 'var(--palette-text-primary)',
          secondary: 'var(--palette-text-secondary)',
          disabled: 'var(--palette-text-disabled)',
          contrast: 'var(--palette-text-contrast)',
        },
        /* The colors used to style the surfaces. */
        surface: {
          DEFAULT: 'var(--palette-surface)',
          paper: 'var(--palette-surface-paper)',
        },
        /* The color used to divide different elements. */
        divider: {
          DEFAULT: 'var(--palette-divider)',
        },
        /* The colors used to style the action elements. */
        action: {
          disabled: 'var(--palette-action-disabled)',
          disabledBg: 'var(--palette-action-disabledBg)',
        },
      },
      minHeight: {
        'header-height': 'var(--spacing-header-height)',
        'block-height': 'calc(100vh - var(--spacing-header-height))',
      },
      spacing: {
        'grid-margin': 'var(--spacing-grid-margin)',
        'grid-gap': 'var(--spacing-grid-gutter)',
        'header-height': 'var(--spacing-header-height)',
        'block-height': 'calc(100vh - var(--spacing-header-height))',
      },
    },
  },
  plugins: [
    typography({
      prefix: 'type-',
      fluid: true,
      clamp: true,
      variants: {
        h1: {
          xs: buildTypographyVariant(fontPrimary, 800, 48, 0.9, 0, allCaps),
          sm: { fontSize: 56 },
          md: { fontSize: 72 },
          lg: { fontSize: 88 },
          xl: { fontSize: 104 },
        },
        h2: {
          xs: buildTypographyVariant(fontPrimary, 800, 40, 0.9, 0.01, allCaps),
          sm: { fontSize: 48 },
          md: { fontSize: 56 },
          lg: { fontSize: 64 },
          xl: { fontSize: 72 },
        },
        h3: buildTypographyVariant(fontPrimary, 800, 36, 0.9, 0.01, allCaps),
        button: buildTypographyVariant(fontPrimary, 400, 13, 1.5, 0.04),
      },
    }),
  ],
}

export default config
