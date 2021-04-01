'use strict';
const { format } = require('date-fns');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const ErrorOverlay = require('eleventy-plugin-error-overlay');
const now = Date.now().toString();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(ErrorOverlay);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter('formatDate', function (value, spec) {
    return format(value, spec);
  });

  eleventyConfig.addShortcode('version', () => now);

  eleventyConfig.setBrowserSyncConfig({
    ...eleventyConfig.browserSyncConfig,
    files: ['build/dist/style.css'],
    ghostMode: false,
    injectChanges: false,
    reloadDelay: 500
  });

  eleventyConfig.addPassthroughCopy('src/humans.txt');
  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'build/dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data'
    },
  };
};
