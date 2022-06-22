const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.svelte', './src/**/*.css'],
  darkMode: false,
  theme: {
    colors: {
      white: colors.white,
      gray: colors.warmGray,
      blue: colors.blue,
      red: colors.red,
      indigo: colors.indigo,
      'svelte-prime': '#ff5030',
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}