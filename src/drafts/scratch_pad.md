# My Node.js Best Practices in 2021

A coworker recently asked:

> Is there any documentation for Node.js that covers everything you did in this
> project? I want to create a simple application using most of the practices you
> followed here.

Separately, the same person asked:

> What do you consider the "best practices" in Node.js?

When I attempted to answer these questions on the spot, I found it difficult to
pin down specifics, but I knew I wanted to do my best to respond. Answering
long-form questions like was one of the main motivations for starting this blog,
so I spent some time thinking about it, and am here to share what I came up
with.

## Different Tools for the Job

The best way to build, structure, and distribute Javascript code for Node.js
varies depending on the problem that code aims to solve. Web applications,
libraries, and command line utilities all have different concerns that need to
be handled, or the same concerns may be handled in different ways.

For example, the way that a command line utility is configured will not be the
same way that a web application is configured. With libraries there may be a
goal to keep the number of dependencies low, especially if the library is
intended to be used on the frontend - but that is not likely a concern of a
developer building an application.

It's important to think about the specific needs of the code you are writing to
know which practices apply in a given situation. _Understanding the problem_ a
given practice or tool is meant to solve, and _how it solves that problem_, are
key to knowing when to apply them. It is just as important to know when _not_ to
use a tool.

With that said, lets jump in.

### Watch 👀: Fastify and Redwood

I have been keeping my eye on, and intend to try at some point in the future,
two other frameworks: [Fastify] and [Redwood].

[Fastify] has been around for a while, but has recently been showing up on my
radar more and more. It can be thought of as a 1:1 replacement for Express. It
has done a lot to learn from the lessons of Express but move the ecosystem
forward, such as by providing direct support for both async route handlers and
Typescript. Its benchmarks claim to be the fastest web application framework in
its field, and the developer ergonomics look like they would be familiar to a
developer used to working with Express. My main concern with Fastify is that it
suffers a similar problem as Hapi: the lack of the massive addon ecosystem
Express enjoys. Some exploration on this front is needed to determine if it
would be suitable, and preferable, to use.

[Redwood] is a much different beast. It aims to build on the "[JAMStack]"
concept by providing a backend deployable on FaaS providers like [Netlify
Functions]. It is also opinionated about using GraphQL on the backend and React on
the frontend. It wraps this entire Developer experience up in a nice package that
is meant to feel as productive as working in a framework like Ruby on Rails. This
framework is in its infancy, but I think it shows potential, so I'm watching it and
intend to try it out to explore the viability of building with it in the future.

[fastify]: https://www.fastify.io
[redwood]: https://redwoodjs.com
[jamstack]: https://jamstack.org
[netlify functions]: https://www.netlify.com/products/functions/
