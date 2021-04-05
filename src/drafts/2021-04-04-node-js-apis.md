---
date:
title:
permalink:
---

# My Node.js API Best Practices in 2021

I've been writing Rest APIs in Node.js, Ruby, and PHP for years. Over time, I've
experimented with different frameworks, tools, and practices, all with the goal
to simplify both the development and consumption of these services. At work,
we're largely beginning to settle on Node.js across the company, so in this
article I want to share what I feel are the best tools to build Node.js APIs
in 2021.

I say "in 2021" because the concept of a "best practice" is a constantly moving
target. As we build we learn, but the ecosystem is also shifting under our feet.
An important skill we can develop as a software engineer is keeping an eye on
the language ecosystem that we are working in, watching for new developments
that supplant older tools with better ways to do things. Consider this document
a "snapshot" of the practices that work well for me today.

## Follow the 12-Factor App Guidelines

https://12factor.net

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

[http-server]: https://nodejs.org/api/http.html#http_class_http_server
[express.js]: https://expressjs.com
[state-of-js]:
        https://2020.stateofjs.com/en-US/technologies/back-end-frameworks/
[openjsf]: https://openjsf.org
[nest]: https://nestjs.com

### Watch: Fastify and Redwood

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
Functions]. It is also opinionated about using GraphQL on the backend and React
on the frontend. It wraps this entire Developer experience up in a nice package
that is meant to feel as productive as working in a framework like Ruby on
Rails. This framework is in its infancy, but I think it shows potential, so I'm
watching it and intend to try it out to explore the viability of building with
it in the future.

[redwood]: https://redwoodjs.com
[fastify]: https://www.fastify.io
[jamstack]: https://jamstack.org
[netlify functions]: https://www.netlify.com/products/functions/

## Use `node-config` for Configuration Management

Best of breed. Happy

## Use `express-openapi` for Swagger Docs

Generally unhappy with the state of this space

## Use Objection for your MySQL Database ORM

Mongoose for MongoDB, watching Prisma

## Use JSON Logging in Production

Bunyan, watching Pino

## Be Consistent in Your API Design

https://geemus.gitbooks.io/http-api-design/content/en/index.html

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
