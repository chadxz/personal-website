'use strict';
const { format } = require('date-fns');
const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = function (eleventyConfig) {
  eleventyConfig.markdownTemplateEngine = 'njk';
  eleventyConfig.dataTemplateEngine = 'njk';
  eleventyConfig.htmlTemplateEngine = 'njk';
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter('formatDate', function (value) {
    return format(value, 'yyyy-MM-dd');
  });
};
