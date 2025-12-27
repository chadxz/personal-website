'use strict';
import { format } from 'date-fns';
import pluginRss from '@11ty/eleventy-plugin-rss';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import readingTime from 'eleventy-plugin-reading-time';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';

const now = Date.now().toString();

export default async function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(syntaxHighlight, {
    preAttributes: { tabindex: 0 }
  });

  const markdownLib = markdownIt({ html: true, linkify: true }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true }),
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

  eleventyConfig.setServerOptions({
    watch: ['build/dist/style.css'],
    middleware: [
      (req, res, next) => {
        if (req.url.endsWith('.html') || req.url.endsWith('/')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
        next();
      }
    ]
  });

  eleventyConfig
    .addPassthroughCopy('src/humans.txt')
    .addPassthroughCopy('src/theme-toggle.js')
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
