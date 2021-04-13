'use strict';
const fs = require('fs');
const { format } = require('date-fns');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const ErrorOverlay = require('eleventy-plugin-error-overlay');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const readingTime = require('eleventy-plugin-reading-time');
const now = Date.now().toString();

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPlugin(ErrorOverlay);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(readingTime);

  const markdownLib = markdownIt({ html: true, linkify: true }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "🔗",
  });
  eleventyConfig.setLibrary('md', markdownLib);

  eleventyConfig.addFilter('formatDate', function (value, spec) {
    return format(value, spec);
  });

  eleventyConfig.addShortcode('version', () => now);

  eleventyConfig.addShortcode("ogImageSource", (slug) => {
    if(!fs.existsSync(`./src/images/og/${slug}.jpg`)) {
      slug = "default";
    }
    return `https://chadxz.dev/images/og/${slug}.jpg`;
  });

  eleventyConfig.addFilter("filterSharablePages", (pages) => (
    pages.filter(page => page.data.layout)
  ));

  eleventyConfig.addFilter("toSocialSharingImagePath", (path) => (
    path || "index"
  ));

  eleventyConfig.addShortcode("getSharingImage", ({ fileSlug }) => (
    `https://chadxz.dev/images/og/${fileSlug || "index"}.jpg`
  ));

  eleventyConfig.setBrowserSyncConfig({
    ...eleventyConfig.browserSyncConfig,
    files: ['build/dist/style.css'],
    ghostMode: false,
    injectChanges: false,
    reloadDelay: 500,
  });

  eleventyConfig
    .addPassthroughCopy('src/humans.txt')
    .addPassthroughCopy({ 'src/*.jpg': '/' })
    .addPassthroughCopy({ 'src/*.png': '/' })
    .addPassthroughCopy({ 'src/*.ico': '/' })
    .addPassthroughCopy({ 'src/images/og/*.jpg': '/images/og/' })
    .addPassthroughCopy({ 'src/images/*': '/images/' });

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
