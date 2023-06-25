'use strict';
const fs = require('fs');
const { format } = require('date-fns');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const readingTime = require('eleventy-plugin-reading-time');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const now = Date.now().toString();

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(syntaxHighlight);

  const markdownLib = markdownIt({ html: true, linkify: true }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true })
  });
  eleventyConfig.setLibrary('md', markdownLib);

  eleventyConfig.addFilter('formatDate', function (value, spec) {
    return format(value, spec);
  });

  eleventyConfig.addShortcode('version', () => now);

  eleventyConfig.addFilter('filterSharablePages', (pages) =>
    pages.filter((page) => page.data.layout)
  );

  eleventyConfig.addFilter('toSocialSharingImagePath', (path) => path || 'index');

  eleventyConfig.addShortcode(
    'getSharingImage',
    ({ fileSlug }) => `https://chadxz.dev/images/og/${fileSlug || 'home'}.jpg`
  );

  eleventyConfig.setServerOptions({ watch: ['build/dist/style.css'] });

  eleventyConfig
    .addPassthroughCopy('src/humans.txt')
    .addPassthroughCopy({ 'src/*.jpg': '/' })
    .addPassthroughCopy({ 'src/*.png': '/' })
    .addPassthroughCopy({ 'src/*.ico': '/' })
    .addPassthroughCopy('src/images/**/*.jpg')
    .addPassthroughCopy('src/images/**/*.png');

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
