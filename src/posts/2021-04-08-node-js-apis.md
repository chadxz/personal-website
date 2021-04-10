---
date: 2021-04-08T17:00:00.00-05:00
title: My Node.js API Best Practices in 2021
permalink: 2021-node-api-best-practices/
tags:
  - node.js
  - API
---

I've been writing Rest APIs in Node.js, Ruby, and PHP for nearly 8 years. Over
time, I've experimented with different frameworks, tools, and practices, all
with the goal to simplify both the development and consumption of these
services. At work, we're largely beginning to settle on Node.js across the
company, so in this article I want to share what I feel are some of the best
tools and practices to build Node.js APIs in 2021.

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
Nearly a decade later, these guidelines are still largely applicable to the web
software that we build today. Key ideas covered include:

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
   directly to your API or if an intermediary such as a proxy is present
5. a **uniform interface** providing a consistent user experience

These principals are relevant because they inform much of the design of the web
as we know it, as well as many of what are considered standard practices today.
Understanding these things will help you make good decisions when building web
APIs and know when certain patterns deviate from the norm.

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
sometimes tricky to get right (such as routing and error handling). Using a web
framework allows you to be more productive by abstracting away these common
concerns and giving you powerful patterns to build on top of.

[Express.js] has been the de-facto standard for building Node.js web
applications for a long time. The [State of Javascript survey][state-of-js]
found it to be the most used Javascript web framework by a large margin for the
past 4 years. The wide breadth of libraries and addons for Express make it a
good choice for any kind of web application. It is being well maintained, is
under the stewardship of the [OpenJS Foundation][openjsf], and is largely
considered to be a stable basis to build upon.

One drawback of using Express, though, is the need for an additional module to
provide an async/await-friendly way to write your route handlers. I use
[express-async-handler] package for this, but it would be nice if they would
bake this directly into the framework.

The [Express.js documentation][express.js] is a solid resource for learning how
to get up and running with the framework. If you are interested in a book,
[Express in Action](https://amzn.to/3dG6boC) appears good (Note: I have not read
this, so take my recommendation with a grain of salt). An important aspect of
building an Express application is stitching together all the necessary
components such as session handling, secure headers, body parsing, and more. The
best way to learn which to use here is to look at open source applications. Some
examples I can recommend are [sahat/hackathon-starter][hackathon-starter] and
[TryGhost/ghost][ghost].

[http-server]: https://nodejs.org/api/http.html#http_class_http_server
[express.js]: https://expressjs.com
[state-of-js]:
        https://2020.stateofjs.com/en-US/technologies/back-end-frameworks/
[openjsf]: https://openjsf.org
[hackathon-starter]: https://github.com/sahat/hackathon-starter
[ghost]: https://github.com/TryGhost/Ghost
[express-async-handler]: https://github.com/Abazhenov/express-async-handler

## Deploy Your Application as a Docker Container

To me, [Docker] is about consistency. When deploying an application to a remote
server, ideally you would not require any dependencies or configuration... you
could simply push your binary to the server and run it with no arguments and it
would behave exactly as you expect. Unfortunately, the reality is far from this
ideal. Most applications require some form of configuration, and Node.js
applications additionally require the Node.js runtime and package dependencies
to be installed at the minimum.

By packaging your application as a Docker container, you not only bundle all of
the dependencies it requires into a single executable Docker "image", but you
also can deploy it onto a system alongside a mix of other applications that
don't necessarily use the same Node.js version, or Node.js at all! In addition
to the convenience of a single consistent package, you can also package your
application to adhere to the typical "Docker" contract: that is, writing your
logs to STDOUT and exposing your application's listening ports via the
Dockerfile `expose` keyword. The result is that many of the typical operational
concerns you have to deal with when managing a web application on a linux
environment are standardized to reduce the cognitive burden of maintaining them.

There are many providers that support using Docker images to run your
application directly. Docker now has [built-in support][docker-ecs] for running
your application on [AWS ECS / AWS Fargate][compose-aws], but if you wanted to
run the host yourself, I recommend using [Ansible] to provision the host, setup
the Docker runtime, and deploy the application.

Using Docker also provides an easy way for developers to collaborate on a given
application using Windows, Linux, or MacOS as their desktop environment. Having
all the packages installed within the Docker image largely eliminates the "works
on my machine" problem, but some care does have to be taken for applications
that have to be reloaded when their code changes.

To learn Docker, I primarily relied on the [Docker documentation][docker-docs].
There are also myriad tutorials and classes available online.

[docker]: https://www.docker.com
[docker-ecs]: https://docs.docker.com/cloud/ecs-integration/
[compose-aws]:
        https://aws.amazon.com/blogs/containers/deploy-applications-on-amazon-ecs-using-docker-compose/
[ansible]: https://www.ansible.com
[docker-docs]: https://docs.docker.com/get-started/

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

To configure your application with node-config, you create a `config/` directory
at the root of your project, then place flat files there that map to values of
the various environments you may run your application in with the `NODE_ENV`
variable (for example, `config/production.yml` is used when you run your
application with `NODE_ENV=production node server.js`). Additionally, you can
specify a file that maps your configuration values to whatever environment
variable name you want. The way it handles defaults and overriding makes
application configuration simple and painless. Then, in your application code,
you simply `const config = require('config');` and then
`config.get('my.config.option')` to retrieve the value. The values are easy to
override in your tests if needed, and the application will crash (as you would
want) when a configuration option is expected but not present.

Always use [node-config] in your Node.js web APIs, unless you are using a
high-level web framework that is handling configuration management for you.

[env-vars]: https://12factor.net/config
[node-config]: https://github.com/lorenwest/node-config

## Use `express-openapi` For Swagger Docs

API Documentation is difficult to keep up-to-date, but is nevertheless important
for any non-trivial application. [Swagger], or more precisely [OpenAPI
3][openapi], is a format for specifying the API contract of a web API. When I
use it, I define my API endpoints, authentication, inputs and outputs in a YAML
file. This file can then be shared with my API consumers using [Swagger UI] to
provide rich documentation and _an interactive UI_ for trying out the API!

To ensure that this specification stays in sync with the actual application
endpoints, I use the [express-openapi] library to build the main Express API
router, request/response validation, and authentication mechanisms directly from
the OpenAPI specification file. This tight coupling gives me 100% confidence
that my documentation is up-to-date. The built-in JSON Schema validation and
type coercion removes much of the boilerplate required to start working with my
API inputs, and the response validation lets me know if any of my responses
stray from my established contract.

Overall though, I wish there were better support for Swagger and OpenAPI in the
Node.js ecosystem. While I do like express-openapi, it is primarily run by a
single maintainer, which is not viable long-term. I occasionally run across bugs
in the framework too, such as [issues parsing `$ref`][ref bug] or [request data
not being coerced properly][coerce bug]. But overall, it is the best tool
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

## Use Objection for Your MySQL Database ORM

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

## Report Your Errors Somewhere You Can See Them

Errors do happen. The key is that you will want to know about them so you can
fix them!

At work, we use [Airbrake] for our error reporting. It is a reasonable service
and has served our needs sufficiently. For my personal projects, I prefer
[Sentry]. It is similar in functionality and allows you to either use their
cloud service or self-host the server that the errors are reported to.

For either of the above services, the general method for using them is the same.
You create the client and register them to listen for errors in your
application, and when they happen, the errors are sent to an aggregation system
for reporting and alerting.

I wholeheartedly recommend using some sort of error reporting in every Node.js
application. Pick one and implement it, and you will be in a much better
position to support your application for your users.

[airbrake]: https://airbrake.io
[sentry]: https://sentry.io/welcome/

## Lint and Automatically Format Your Code

In most languages there is the concept of a "[linter]": a tool that checks your
code for problems. The problems that a linter looks for are issues that a normal
compiler would allow, but that are disallowed by some standard for writing
software. That standard could be local to a given team, to a company, or to a
language ecosystem as a whole.

It has also increasingly become commonplace for languages to have a
"[formatter]", which rewrites your code in a consistent way.

I recommend ensuring you have both setup when writing Javascript. At work, we
use a combination of [ESLint], [Standard], and [Prettier] to lint and format our
code. Using these tools helps to guide your code down a "happy path" and keeps
the code consistent across multiple developers. We chose the Standard set of
lints so that we could have some baseline linting that was minimally opinionated
but that gave strong guidance away from common issues experienced when writing
Javascript. Things like accidentally forgetting your `break` statement in a
switch branch, or using a coercing equality operator (`==`) instead of a strict
equality operator (`===`) are checked for and warned about. These sorts of
warnings help avoid common issues and result in more efficient development.

Since Standard and Prettier have some overlap (Standard has some rules defining
formatting), you can use [prettier/eslint-config-prettier] to disable any
style-related rules Standard would setup to allow Prettier own style-related
concerns. You can also use [prettier/eslint-plugin-prettier] to get warnings
from eslint if your code is not formatted as your prettier rules say they are.
Finally, you can combine all of this with tools like [Husky] and [lint-staged]
to ensure that both eslint and prettier are running prior to your code being
committed to version control.

Set these up once at the beginning of your project, then let them guide you and
keep you from thinking about this stuff any more!

[linter]: https://en.wikipedia.org/wiki/Lint_%28software%29
[formatter]: https://en.wikipedia.org/wiki/Prettyprint
[eslint]: https://eslint.org
[standard]: https://standardjs.com/index.html
[prettier]: https://prettier.io
[prettier/eslint-config-prettier]:
        https://github.com/prettier/eslint-config-prettier
[prettier/eslint-plugin-prettier]:
        https://github.com/prettier/eslint-plugin-prettier
[husky]: https://github.com/typicode/husky
[lint-staged]: https://github.com/okonet/lint-staged

## Use Jest to Test Your Code

There are dozens of test frameworks available in the Javascript ecosystem. This
is great! Having the ability to choose which one matches your mental model
closest is a good thing. For the work that I do, I have been setting up [Jest]
for new projects and have been really happy with it.

Jest is a test framework that emerged out of the React ecosystem. It is a
"batteries-included" test framework, combining testing, mocking, and test
coverage analysis all in one. Previous to using Jest, I had been using a
combination of [Mocha], [Sinon], and [Istanbul] to cover all of these needs.
Additionally, Jest has really nice assertion failure output, helping you find
exactly where the problem is in your code. No other test framework that I have
worked with has this level of quality in their assertion output. Overall, using
Jest is a quick way to get up-and-running with tests in your code.

Additionally, I recommend co-locating your tests with your code. That is,
putting your test files in the same directory as your actual code files. For
example, if I have a file named `src/models/PhoneConfiguration.js`, I would also
have a `src/models/PhoneConfiguration.test.js` file containing my Jest tests.
This pattern helps speed up your development flow, and quickly highlights where
test coverage is completely missing from certain files.

Test your code! And use Jest.

[jest]: https://jestjs.io
[mocha]: https://mochajs.org
[sinon]: https://sinonjs.org
[istanbul]: https://istanbul.js.org
[jasmine]: https://jasmine.github.io

## What About Typescript?

While reading through this, you may have been wondering:

> What about Typescript? Isn't that how people are writing Javascript these
> days?

It is true that Typescript has risen massively in popularity over the past few
years. Indeed, even though I have not been writing any Typescript directly in my
day-to-day, I get a lot of value out of the typings that libraries provide, both
those bundled with the libraries and those I add as dependencies from the
[DefinitelyTyped] repository. These help my editor give me advanced code
completion for those libraries and speeds up development.

But at my company, Node.js is still on an adoption/learning curve. We are
wanting to make that curve as shallow as possible for new contributors to the
Node.js applications, because they only have so much time in the day to be
learning new things. Their attention is split across many different technology
stacks, ranging from legacy PHP with custom-rolled web frameworks to Ruby on
Rails applications, to the one-off Node.js applications that are beginning to
gain more traction. We are getting a lot of value out of JSDoc to explicitly
declare the inputs and outputs of functions, and since that is entirely opt-in,
it does not get in the way of developers ability to get their work done.

Over time I expect that we will write more Typescript. But for now, it's not a
priority.

[definitelytyped]: https://definitelytyped.org

## Closing Thoughts for 2021

So that is my list of recommendations for building a Node.js API in 2021. While
these practices are working well for me now, I'm also paying attention to where
there are gaps or friction. I'm also watching out for new, innovative ways to
build the sorts of applications I'm building. On my radar are things like
[GraphQL], better logging libraries infrastructure (like the [Pino] library and
[Grafana Loki]), and distributed tracing tooling (the [OpenTracing] project). I
am also constantly learning architectural patterns that are in use in our
industry, so that I can be familiar enough with them to know when they may apply
to any given problem that I'm attempting to solve.

The main improvement to this stack in the last year is the use of Objection. I
had been keeping an eye on it for a while and only this year decided to give it
a try. I was really happy with how that application turned out, and look forward
to continue working with that library in the future.

The main area that I see that is lacking is the OpenAPI support. express-openapi
is a good tool, but I would like to see wider adoption and an increase in the
contributors to that project, or see another tool rise up in its place that has
a stronger backing and wider adoption. I feel OpenAPI is severely underrated for
what it provides.

So, go forth and build. And remember: "Best Practices" come and go. Keep your
eyes open!

[graphql]: https://graphql.org
[grafana loki]: https://grafana.com/oss/loki/
[pino]: https://github.com/pinojs/pino
[opentracing]: https://opentracing.io
