---
date:
title:
permalink:
---

# My Node.js API Best Practices in 2021

I've been writing Rest APIs in Node.js, Ruby, and PHP for nearly 8 years. Over
time, I've experimented with different frameworks, tools, and practices, all
with the goal to simplify both the development and consumption of these
services. At work, we're largely beginning to settle on Node.js across the
company, so in this article I want to share what I feel are the best tools to
build Node.js APIs in 2021.

I say "in 2021" because the concept of a "best practice" is a constantly moving
target. As we build we learn, but the ecosystem is also shifting under our feet.
An important skill we can develop as a software engineer is keeping an eye on
the language ecosystem that we are working in, watching for new developments
that supplant older tools with better ways to do things. Consider this document
a "snapshot" of the practices that work well for me today.

## Follow the 12-Factor App Guidelines

Around 2011-2013, the concept of a [12-factor] app made the rounds. Originally
written by Adam Wiggins who was then working with Heroku, the site describes
guidelines for building applications that are designed to be run in the cloud.
Even nearly a decade later, these guidelines are still largely applicable to the
web software that we build today. Key ideas covered include:

- Dropping reliance on flat files for configuration, logs, state, etc.
- Using a deployment model that explicitly manages dependencies
- Building with horizontal scalability in mind
- ... and more

Even though these "12 factors" map cleanly to Heroku's deployment style and
therefore are an obvious on-ramp for using their service, they are undoubtedly
relevant even when you deploy to another cloud service or self-host.

Many of the "factors" outlined on the 12-factor site will be touched on later in
this document. If you are building a Node.js API, it is a good idea to be
familiar with the [12-factor principles][12-factor] and apply them where it
makes sense.

[12-factor]: https://12factor.net

## Use a Consistent API Design

When building a web API, it is easy to craft endpoints that, in aggregate, are
haphazard and messy to work with. Inconsistencies in response codes, response
format, acceptable request content types, and more can all be avoided with some
up-front thought about the patterns and standards you want to employ.

The guide that I have found to most closely match my mental model for how best
to design a web API are found in the [HTTP API Design Guide][api-guide]. I have
never implemented 100% of the recommendations made in the document, but the
"request" and "response" sections are gold and should be seriously considered
when building your own web API. These make suggestions such as:

- use plural resource names
- clearly delineate actions when they do not map cleanly to HTTP verbs
- downcase paths and attributes
- minimize path nesting
- ... and more

Consistency is a key part of building an ergonomic web API. So read [the
guide][api-guide], decide on your own standard, and stick to it!

[api-guide]: https://geemus.gitbooks.io/http-api-design/content/en/index.html

## Understand the Meaning of "RESTful"

Almost none of the "REST APIs" on the web are 100% "RESTful". How much or how
little you adopt the tenets of RESTful API design is entirely up to you, but it
helps tremendously to understand the core architectural pattern of building a
web API before you make your own adjustments.

The primary architectural constraints of a RESTful web API are:

1. a **client-server architecture** that allows each component to evolve
   separately
2. **stateless** requests, where any state required to process a request is sent
   along with the request (think: cookies)
3. **cacheable** responses, improving client performance and server stability
4. a **layered system**, where the client cannot distinguish if it is speaking
   directly to your API or if an intermediary such as a reverse proxy is present
5. a **uniform interface** providing a consistent user experience

Some resources I used to learn the fundamentals of RESTful web API design are
the corresponding [Wikipedia article], the [resfulapi.net] tutorial, and the
book [RESTful Web APIs] by Leonard Richardson & Mike Amundsen.

[resfulapi.net]: https://restfulapi.net
[wikipedia article]:
        https://en.wikipedia.org/wiki/Representational_state_transfer
[restful web apis]: https://amzn.to/3sUWSrB

## Use the Express Framework as a Starting Point

While it is possible to build a web application in Node.js using only the
built-in functionality the [standard library][http-server] provides, you will
end up writing a lot of code that is common to every web application and is
sometimes tricky to get right (authentication and sessions, for example). Using
a web framework allows you to be more productive by abstracting away these
common concerns and giving you powerful patterns to build on top of.

[Express.js] has been the de-facto standard for building Node.js web
applications for a long time. The [State of Javascript survey][state-of-js]
found it to be the most used Javascript web framework by a large margin for the
past 4 years. The wide breadth of libraries and addons for Express make it a
good choice for any kind of web application. It is being well maintained, is
under the stewardship of the [OpenJS Foundation][openjsf], and is largely
considered to be a stable basis to build atop.

The [Express.js documentation][express.js] is a solid resource for learning how
to get up and running with the framework. If you are interested in a book,
[Express in Action](https://amzn.to/3dG6boC) appears good (Note: I have not read
this, so take my recommendation with a grain of salt). An important aspect of
building an Express application is stitching together all the necessary
components such as session handling, secure headers, body parsing, and more. The
best way to learn which to use here is to look at open source applications. Some
examples I can recommend are [sahat/hackathon-starter][hackathon-starter] and
[TryGhost/ghost][ghost].

One drawback of using Express, though, is the need for an additional module to
provide an async/await-friendly way to write your route handlers. I use
[express-async-handler] package for this, but it would be nice if they would
bake this directly into the framework.

[http-server]: https://nodejs.org/api/http.html#http_class_http_server
[express.js]: https://expressjs.com
[state-of-js]:
        https://2020.stateofjs.com/en-US/technologies/back-end-frameworks/
[openjsf]: https://openjsf.org
[hackathon-starter]: https://github.com/sahat/hackathon-starter
[ghost]: https://github.com/TryGhost/Ghost
[express-async-handler]: https://github.com/Abazhenov/express-async-handler

## Use `node-config` for Configuration Management

In the 12-factor guidelines, it talks about [storing your configuration in your
environment][env-vars]. I have also found this to be a solid approach that pairs
nicely with running your application in a Docker container. Configuring your
application with environment variables in development can be a hassle, though,
so it is good to find a configuration tool that allows using both environment
variables and flat files.

In the Node.js ecosystem, I have been using [node-config] for years and have
never had any desire to move away from it. It is simple, flexible, and powerful.
It supports different flat file configuration formats, but I tend to use YAML.

To configuration your application with node-config, you create a `config/`
directory at the root of your project, then place flat files there that map to
values of the various environments you may run your application in with the
`NODE_ENV` variable. Additionally, you can specify a file that maps your
configuration values to whatever environment variable name you want. The way it
handles defaults and overriding makes application configuration simple and
painless. Then, in your application code, you simply
`const config = require('config');` and then `config.get('my.config.option')` to
retrieve the value. The values are easy to override in your tests if needed, and
the application will crash (as you would want) when a configuration option is
expected but not present.

Always use [node-config] in your Node.js web APIs, unless you are using a
high-level web framework that is handling configuration management for you.

[env-vars]: https://12factor.net/config
[node-config]: https://github.com/lorenwest/node-config

## Use `express-openapi` for Swagger Docs

API Documentation is difficult to keep up-to-date, but is nevertheless important
for any non-trivial application. [Swagger], or more precisely [OpenAPI
3][openapi], is a format for specifying the API contract of a web API. When I
use it, we define our API endpoints, authentication, inputs and outputs in a
YAML file. This file can then be shared with your API consumers using [Swagger
UI] to provide rich documentation and _an interactive UI_ for trying out the
API!

To ensure that this specification stays in sync with the actual application
endpoints, I use the [express-openapi] library to build the main Express API
router, request/response validation, and authentication mechanisms directly from
the OpenAPI specification file. This tight coupling gives me 100% confidence
that my documentation is up-to-date. The built-in JSON Schema validation and
type coercion removes much of the boilerplate required to start working with
your API inputs, and the response validation lets you know if any of your
responses stray from your established contract.

Overall though, I wish there were better support for Swagger and OpenAPI in the
Node.js ecosystem. While I do like express-openapi, it is primarily run by a
single maintainer, which is not viable long-term. We occasionally run across
bugs in the framework too, such as [issues parsing `$ref`][ref bug] or [request
data not being coerced properly][coerce bug]. But overall, it is the best tool
available that I'm aware of, and I would much rather use it even under these
conditions than go back to not having the OpenAPI documentation.

Here's hoping more quality OpenAPI tools arrive in the Node.js community.

[swagger]: https://swagger.io
[swagger ui]: https://swagger.io/tools/swagger-ui/
[openapi]: https://www.openapis.org
[express-openapi]:
        https://github.com/kogosoftwarellc/open-api/tree/master/packages/express-openapi
[ref bug]: https://github.com/kogosoftwarellc/open-api/issues/647
[coerce bug]: https://github.com/kogosoftwarellc/open-api/issues/710
[swagger ui]: https://swagger.io/tools/swagger-ui/

## Use Objection for your MySQL Database ORM

I've used a few different ORMs in the time I've been writing code in Node.js:
Waterline, Mongoose, Sequelize, Bookshelf, and now Objection. I have also
eschewed ORMs entirely and directly used Knex to build my database-connected
models. Of all these approaches, my favorite so far is using Objection.

[Objection] is an ORM for SQL databases. It is a thin layer on top of Knex,
providing just enough of an abstraction to lend a hand with building models and
the relationships between them. It is thoroughly documented and feels ergonomic
to program with. It keeps the best parts of Knex available where you need them.
For now, I'll be using Objection when I am building a SQL-backed app.

[objection]: https://vincit.github.io/objection.js/

## Use JSON Logging in Production

Bunyan, watching Pino

## Report Your Errors Somewhere You Can See Them

Airbrake at work, Sentry at home.

## Use a Model-Service-Controller Pattern

Use Models for data access and query modeling, services to bind models together
an execute business logic, and controllers for the web-bindings. Fat services.

## Use ESLint, Standard and Prettier to Lint and Fix your Code

Set it up once, let it guide you and keep you from thinking about this stuff.

## Use Jest to Test your Code

Rough edges, but batteries included and mostly good.

## Deploy your Application as a Docker Container

Consistency in production helps a lot.

## What about Typescript?

Get a lot of value out of library types, JSDoc and unit testing. Haven't felt
the desire to dive into Typescript for the application source yet, but looking
to spend more time on this on the side to evaluate further.

## Closing Thoughts for 2021
