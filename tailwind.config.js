module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'class', // or 'media' or 'class',
  theme: {
    extend: {
      boxShadow: {
        px: 'var(--sizeUnit) var(--sizeUnit) 0 0 rgba(0, 0, 0, 1)',
      },
      borderWidth: {
        px: 'var(--sizeUnit)',
      },
      spacing: {
        px: 'var(--sizeUnit)'
      },
      outline: {
        px: ['calc(.5 * var(--sizeUnit)) dotted #000', 'calc(-0.5 * var(--sizeUnit))']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
