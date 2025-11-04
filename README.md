# personal-website 2021

This is the source of [chadxz.dev](https://chadxz.dev), the personal blog of
Chad McElligott.

## details

- 11ty static site generator
- tailwind css v4
- buttondown.email mailing list
- deployed to Netlify

For more details, see the [blog post](https://chadxz.dev/bootstrap/).

## development

To get started with development:

- install Node.js.
- install the npm packages. `npm install`
- start the dev server. `npm start`
- open your browser to the link printed on the console.

When you are editing the markdown files or the style.css, it will automatically
reload the browser.

## deployment

Deployment is wired up to Netlify. New commits to the `main` branch will
automatically deploy to [chadxz.dev](https://chadxz.dev).

## writing new posts

New posts are stored in [src/posts](src/posts). Drop a new file there with the
format `YYYY-MM-DD-slug.md` where `slug` would be a short name for the article.
See other blog posts for examples of the "front matter" 11ty uses to create
things like the filename for the generated html page, tags, publish date, etc.
