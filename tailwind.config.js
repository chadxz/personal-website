'use strict';

module.exports = {
  mode: 'jit',
  purge: ['build/dist/**/*.html'],
  plugins: [
    require('@tailwindcss/typography'),
  ]
};
