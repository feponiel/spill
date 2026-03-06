import { Theme } from './_theme'

export const lightTheme: Theme = {
  name: 'light',

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

    shade100: '#0b0d12',
    shade300: '#252833',
    shade400: '#525866',
    shade600: '#d6dbe4',
    shade700: '#e6ebf2',
    shade800: '#f3f6fb',
    shade900: '#f9fbff',

    red500: '#f75a78',
  },

  shadows: {
    default: '0 0.25rem 0.875rem rgba(0, 0, 0, 0.08)',
    header: '0 0.375rem 1rem rgba(15, 23, 42, 0.06)',
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
