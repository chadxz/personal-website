---
date: 2023-07-10T13:00:00
title: Review Your Own Work
description:
  One simple trick to save your coworkers time and raise your own bar.
permalink: self-review/
tags:
  - process
  - programming
  - writing
  - career
---

One of the key traits of a senior engineer and especially a staff+ engineer is
being _self-directing_. A trick I have used for years to do my best work and
reduce the burden on my coworkers is to review my own work.

Reviewing your own work means taking off your "author" hat and putting on your
"reviewer" hat, inspecting it from a detached perspective and evaluating its
merits, style, and other qualities as if you were reviewing the same from
someone else. You want to do this prior to sharing your work with others so that
they don't also have to muddle through all the mistakes you will find on your
own in your self-review. You will also want to hold yourself to a higher
standard than you would hold others to, to grow yourself and set a good example
for others.

While this may sound obvious, I rarely meet someone that also follows this
practice, so I'm going to walk through two examples of how this looks and what
you may gain from the practice.

## Review Your Own Merge Requests

When preparing a code merge request into your version control, create a full
draft of the request and then fully review it yourself before requesting others
to do the same. It's super easy to work on a branch for days or even weeks
before opening a merge request, but a lot more difficult for someone to come
along and provide a meaningful review of that work. If you review this work
yourself prior, it will naturally encourage you to build merge requests that are
great to review - smaller, well-scoped, well-explained, and relevant.

Performing a code review of your own work will naturally force you to ask
yourself: "What are the important pieces of this request that should be
reviewed?" Since it is your own code, you have a different sort of bias than you
have when you review others' code. By deliberately disconnecting yourself from
your own code when you self-review, you combat your bias to cut corners or do
work that you would frown upon if done by others. The result here is that you
not only deliver more rigorous work, but you also begin to acknowledge where
your judgment of others' work may be nitpicking or otherwise not helpful and can
cut it out!

There are tons of good practices you should be looking for when you review code,
but when you are reviewing your own code especially, you may ask yourself
questions like:

- Does this Merge Request description / commit message accurately describe _why_
  the change is being submitted and any additional context that may be helpful
  when reviewing? Consider the advice from [Chris Beams][cbeams].
- Is this work complete?
- Are there any important test cases missing?
- Are the functions and structures well-factored, well-named, and
  well-documented?
- Is this demonstrably working? Could the merge request description indicate how
  it was end-to-end tested?
- Are there any other commits, documents, or tickets that would be useful
  context when reviewing this? Are they in the description?
- Is this the right size? Does it capture a full piece of work, or if it's only
  a segment of work, can it stand on its own without breaking anything?
- Is this too big? (hint: if you can't review it in one sitting, it's too big)

This is only a short list as an example. You should decide on your own review
criteria, but it should encompass at least what your organization considers the
"best practices" for merge requests.

[cbeams]: https://cbea.ms/git-commit/

## Review Your Own RFCs

[Request For Comment][rfc] (RFC) documents are used to gather feedback on a
proposal that you have the autonomy to implement, but want to gather thoughts
and ideas from others to round out your own. Before you share an RFC widely, put
on your reviewer cap and evaluate it critically. You're about to ask many people
to build a mental model of your proposal and provide helpful feedback, which is
hard work! To help them out, you can make sure your document succinctly captures
your idea and how it solves a specific, well-understood problem.

A great RFC will typically capture the need or problem that is being solved, the
proposed solution, alternatives that were considered, and why the specific
solution was the best among the alternatives. This will help your reviewer feel
you have considered the problem from all known angles. Some questions you may
want to ask yourself when self-reviewing are:

- Is the problem clearly stated? Am I assuming some amount of knowledge that
  could instead be explicitly stated?
- Are there any additional approaches that were considered or tried prior to
  this proposal that I omitted?
- Is my proposal considering all those that will be affected by this change? If
  not, how can I expand the proposal to elaborate on this wider impact?
- Is there any way to make this shorter? Am I being redundant anywhere that
  could be trimmed?
- Is there enough detail in my proposal to allow reviewers to evaluate it fully?
  If not, is there some way to make it explicit what kind of feedback I am
  looking for given the amount of detail?
- Am I being biased in my description of the alternatives? Are the true merits
  and drawbacks given or are they cherry-picked to support my proposal?
- Is this proposal truly better than "doing nothing"? Is this made plain in the
  document?

Again, these are merely some criteria to use as a jumping-off point for
reviewing your own RFCs in case you aren't sure where to start. Definitely
consider what you think makes an RFC "great" to you, and hold yourself to that
high bar.

## Conclusion

Reviewing your own work is an important part of respecting others' time and
making sure you are getting the most out of the time they do dedicate to helping
you. It also helps you to be more thoughtful about the value you are creating
within your organization which results in better results for everyone. Before
asking for someone else to review your work, put the effort in to review it
yourself - you won't regret it.

[rfc]: http://philcalcado.com/2018/11/19/a_structured_rfc_process.html
