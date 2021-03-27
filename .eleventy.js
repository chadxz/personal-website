'use strict';
const { format } = require('date-fns');
module.exports = function(eleventyConfig) {
  eleventyConfig.markdownTemplateEngine = "njk";
  eleventyConfig.addFilter('formatDate', function (value) {
    return format(value, 'yyyy-MM-dd');
  });
}
