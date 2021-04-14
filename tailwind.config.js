'use strict';
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['build/dist/**/*.html'],
  plugins: [require('@tailwindcss/typography')],
};
