import { Theme } from './_theme'

export const darkTheme: Theme = {
  name: 'dark',

  defaults: {
    headerHeight: '70px',
    scrollBarWidth: '5px',
    containerWidth: '900px',
    containerGap: '2rem',
  },

  fonts: {
    default: 'var(--font-roboto)',
  },

  fontSizes: {
    xxs: '0.6875rem',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
  },

  fontWeights: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },

  lineHeights: {
    shorter: '125%',
    short: '140%',
    base: '160%',
    tall: '180%',
  },

  colors: {
    white: '#ffffff',
    black: '#121212',

    accentColorLight: '#f5ebc8',
    accentColor: '#c9b458',
    accentColorDark: '#8e7f3a',

    shade100: '#f4f4f5',
    shade300: '#b4b4be',
    shade400: '#8f8f99',
    shade600: '#242429',
    shade700: '#1f1f23',
    shade800: '#18181b',
    shade900: '#0b0b0d',

    red500: '#f75a78',
  },

  space: {
    px: '1px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
  },

  radius: {
    xs: '2.5px',
    sm: '5px',
    md: '10px',
    lg: '20px',
    full: '9999px',
  },
}
