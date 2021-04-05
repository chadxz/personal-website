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

## Use Async/Await for Asynchronous Code
