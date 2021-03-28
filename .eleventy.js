'use strict';
const { format } = require('date-fns');
const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy('style.css');

  eleventyConfig.addFilter('formatDate', function (value) {
    return format(value, 'yyyy-MM-dd');
  });

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  }
};
