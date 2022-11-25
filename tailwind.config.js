/* eslint-disable import/no-extraneous-dependencies, global-require */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}',
    './node_modules/astro-boilerplate-components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        benhammondblue: {
          DEFAULT: '#336699',
          50: '#A3C2E0',
          100: '#94B8DB',
          200: '#75A3D1',
          300: '#578FC7',
          400: '#3D7AB8',
          500: '#336699',
          600: '#254A6F',
          700: '#172E45',
          800: '#09121B',
          900: '#000000',
        },
        benhammondyellow: {
          DEFAULT: '#FFC600',
          50: '#FFEFB8',
          100: '#FFEAA3',
          200: '#FFE17A',
          300: '#FFD852',
          400: '#FFCF29',
          500: '#FFC600',
          600: '#C79A00',
          700: '#8F6F00',
          800: '#574300',
          900: '#1F1800',
        },
        benhammondgreen: {
          DEFAULT: '#4DAA57',
          50: '#C8E6CC',
          100: '#BAE0BE',
          200: '#9ED3A4',
          300: '#82C689',
          400: '#66BA6F',
          500: '#4DAA57',
          600: '#3C8343',
          700: '#2A5D2F',
          800: '#19361C',
          900: '#071008',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
