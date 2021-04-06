'use strict';
const { format } = require('date-fns');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const ErrorOverlay = require('eleventy-plugin-error-overlay');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const now = Date.now().toString();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(ErrorOverlay);
  eleventyConfig.addPlugin(pluginRss);

  const markdownLib = markdownIt({ html: true, linkify: true }).use(markdownItAnchor);
  eleventyConfig.setLibrary('md', markdownLib);

  eleventyConfig.addFilter('formatDate', function (value, spec) {
    return format(value, spec);
  });

  eleventyConfig.addShortcode('version', () => now);

  eleventyConfig.setBrowserSyncConfig({
    ...eleventyConfig.browserSyncConfig,
    files: ['build/dist/style.css'],
    ghostMode: false,
    injectChanges: false,
    reloadDelay: 500,
  });

  eleventyConfig.addPassthroughCopy('src/humans.txt');
  eleventyConfig.addPassthroughCopy({ 'src/*.png': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/*.ico': '/' });
  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'build/dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
  };
};
