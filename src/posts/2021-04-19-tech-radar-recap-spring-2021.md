---
date: 2021-04-19T17:00:00.00-05:00
title: Highlights from the April 2021 ThoughtWorks Technology Radar
description: >-
  The "blips" on the radar I share or find interesting, and my commentary.
permalink: 2021-april-tech-radar-thoughts/
tags:
  - radar
---

Twice a year, the consulting agency [ThoughtWorks][tw] publishes a document they
call the [Technology Radar][tr]. In this document, they describe trends in
tools, techniques, languages/frameworks, and platforms that they are seeing in
their work with their clients. They break down their observations along 4
categories: Adopt, Trial, Assess and Hold.

These documents are released twice a year, and I generally try to read through
them. Due to ThoughtWorks working with lots of clients (they're a [huge
consultancy][hc]: ~8000 employees in 48 offices around the world!), they have a
perspective that those of us working at a single company don't have. The Radar
is contributed to by many bright engineers, as well; people like [Martin
Fowler][fowler], [Neal Ford][ford], [Sam Newman][newman], [Pat Kua][kua] and
more. The way I like to think of these documents is as a fireside chat with
veterans of the industry: they've been around the block a few times and have
interesting things to share. Maybe they're useful to me, maybe not, but it's
still great to hear these stories and allow them to shape my own perspective.

Below you will find the "blips" - individual trends in their assessment - that I
found particularly interesting or that resonated with me.

[tw]: https://www.thoughtworks.com
[tr]: https://www.thoughtworks.com/radar
[hc]: https://en.wikipedia.org/wiki/ThoughtWorks
[fowler]: https://twitter.com/martinfowler
[ford]: https://twitter.com/neal4d
[newman]: https://twitter.com/samnewman
[kua]: https://twitter.com/patkua

## Adoption Recommendation Highlights

The ThoughtWorks definition of their "adopt" classification is:

> We feel strongly that the industry should be adopting these items. We use them
> when appropriate on our projects.

Of all the suggestions for adoption, four stood out to me.

### Technique Adoption - Design Systems

The Technology Radar has [this to say about design systems][ds]:

> As application development becomes increasingly dynamic and complex, it's a
> challenge to deliver accessible and usable products with consistent style.
> This is particularly true in larger organizations with multiple teams working
> on different products. **Design systems** define a collection of design
> patterns, component libraries and good design and engineering practices that
> ensure consistent digital products. Built on the corporate style guides of the
> past, design systems offer shared libraries and documents that are easy to
> find and use. Generally, guidance is written down as code and kept under
> version control so that the guide is less ambiguous and easier to maintain
> than simple documents. Design systems have become a standard approach when
> working across teams and disciplines in product development because they allow
> teams to focus. They can address strategic challenges around the product
> itself without reinventing the wheel every time a new visual component is
> needed.

Design Systems are fantastic and especially help backend-heavy engineering teams
make their applications look better, have ergonomic UX, and generally shine
compared to how they would be without a design system. This is a great way to
scale a smaller UI/UX team to have larger, organization-wide impact.

Building the design system is only one piece of the puzzle, though. To be
successful, it needs adoption. Without organizational mandate, the design team
needs to socialize it, make it easily accessible, and advocate for its use and
growth. As teams begin to use it and see its value, organic growth and feedback
will kick in to foster its continued use and adoption.

Our company is just beginning to build out its own design system with React and
[Storybook][sb]. I'm really looking forward to seeing if it gains traction and
adoption outside the immediate team that is building it.

[ds]: https://www.thoughtworks.com/radar/techniques/design-systems
[sb]: https://storybook.js.org

### Technique Adoption - Applying The Expand-Contract Pattern to APIs

API versioning is hard. I was encouraged to see [this one][aec] in the radar's
"adopt" section this year:

> The **API expand-contract** pattern, sometimes called [parallel change][pc],
> will be familiar to many, especially when used with databases or code;
> however, we only see low levels of adoption with APIs. Specifically, we're
> seeing complex versioning schemes and breaking changes used in scenarios where
> a simple expand and then contract would suffice. For example, first adding to
> an API while deprecating an existing element, and then only later removing the
> deprecated elements once consumers are switched to the newer schema. This
> approach does require some coordination and visibility of the API consumers,
> perhaps through a technique such as [consumer-driven contract][cdc] testing.

I'm not a fan of "versioning schemes" in REST APIs, but I am a proponent of
upholding a contract with my consumers. Prepending versions onto an API (like
`www.myservice.dev/api/v1/...`) is ugly and frequently only ever ends up being
`/v1/` for the application's entire life. Other versioning schemes, such as
requiring a specific `Accept` header, I have not seen much of in practice.

The API expand-contract pattern, on the other hand, offers a pragmatic approach
to introducing changes using a migration strategy embracing the concept of
[evolutionary architecture][ea]. Instead of cut-overs that require lock-step
collaboration, we can instead think of our changes as a slowly evolving system.
Using the expand-contract pattern, we can change our system organically,
allowing our consumers to migrate at their own pace. This is the path that most
aligns with my experience and preference.

#### How the Expand-Contract Pattern Works

One of the best practices for consuming a JSON API is to [ignore any keys you
don't use][pl]. In other words, If you are consuming an API that has a signature
like this:

<!-- prettier-ignore -->
```json
{
  "id": 123,
  "author": {
    "name": "Ada Lovelace",
    "email": "ada@chadxz.dev"
  },
  "commit": "dd252e7"
}
```

... you should avoid doing anything that would assert the exact structure of the
payload. Doing so would couple your implementation too closely to the response,
whereas you could instead code only to the keys you need and ignore the
remainder. That way if the payload changed to add a new key:

<!-- prettier-ignore -->
```diff
{
  "id": 123,
  "author": {
    "name": "Ada Lovelace",
    "email": "ada@chadxz.dev"
  },
  "commit": "dd252e7",
+  "hash": "dd252e7478279c6391b50421cec801a652040986"
}
```

... your code continues to work without any changes. This allows the API
producer to evolve an API without breaking you. They can then deprecate the
`commit` field and schedule it to be removed, allowing their consumers to
migrate to the new `hash` field if they need it.

This pattern could also be followed by adding a new API while keeping the
deprecated API in place for a while. For example, in [the gRPC ecosystem][grpc]
with the protobuf RPC format, they recommend never removing fields, renaming
fields or messages, changing field types, etc. Eventually when you do need to
cull the old versions, you would release a new version of your service with a
new protobuf version, deprecate the old API, and allow the two to live alongside
one another until the old API's End of Life (EOL) date hits.

You can read more about the expand-contract pattern in the [corresponding Martin
Fowler wiki article][pc].

[pl]: https://en.wikipedia.org/wiki/Robustness_principle
[aec]: https://www.thoughtworks.com/radar/techniques/api-expand-contract
[pc]: https://www.martinfowler.com/bliki/ParallelChange.html
[cdc]: https://martinfowler.com/articles/consumerDrivenContracts.html
[ea]: https://www.youtube.com/watch?v=CglSFhwbI3s
[grpc]:
  https://docs.microsoft.com/en-us/aspnet/core/grpc/versioning?view=aspnetcore-5.0

### Other Noteworthy Adoption Recommendations

- **technique adoption - [Platform Engineering Product Teams][pept]** - Platform
  Engineering stands out to me as a model for IT to adapt to the cloud while
  continuing to provide value to the engineering teams they aim to support.
  Building out the platform as a "product" with internal "customers" is the
  _only_ way to ensure that what is built is serving, instead of hindering, the
  teams that will be using it. Building an internal IT platform as a "product"
  involves much of the same collaboration and mutual consideration that the
  DevOps movement is all about, but it is also a stark paradigm shift from the
  normal workflow of an IT professional. While challenging, I believe this kind
  of endeavour is the future of engineering-focused IT teams.

- **tool adoption - [Sentry][tws]** - this was called out as a go-to tool for
  error reporting. Not much to say here, other than _\*nodding head
  furiously\*_. I highlighted Sentry as my preferred bug tracker in my [2021
  Node.js Best Practices][bp] post. It's a great tool, and people should
  definitely be using it if they aren't already entrenched using something else.

[tws]: https://www.thoughtworks.com/radar/tools/sentry
[bp]:
  https://chadxz.dev/2021-node-api-best-practices/#report-your-errors-somewhere-you-can-see-them
[pept]:
  https://www.thoughtworks.com/radar/techniques/platform-engineering-product-teams

## Trial Recommendation Highlights

The definition of their "trial" classification is:

> Worth pursuing. It is important to understand how to build up this capability.
> Enterprises should try this technology on a project that can handle the risk.

There were 2 main techniques they qualified for trial that I strongly agree
with, and others that piqued my interest that I want to learn more about.

### Technique Trial - Lightweight Approach to RFCs

[This recommendation][rfc] was confusing to me:

> As organizations drive toward [evolutionary architecture][ea], it's important
> to capture decisions around design, architecture, techniques and teams' ways
> of workings. The process of collecting and aggregating feedback that will lead
> to these decisions begin with Request for Comments (RfCs). RfCs are a
> technique for collecting context, design and architectural ideas and
> collaborating with teams to ultimately come to decisions along with their
> context and consequences. We recommend that organizations take a **lightweight
> approach to RFCs** by using a simple standardized template across many teams
> as well as version control to capture RfCs.

> It's important to capture these in an audit of these decisions to benefit
> future team members and to capture the technical and business evolution of an
> organization. Mature organizations have used RfCs in autonomous teams to drive
> better communication and collaboration especially in cross-team relevant
> decisions.

It's unclear what they are comparing lightweight RFCs to... "Heavyweight" RFCs?
There's no description or elaboration on what the problematic RFCs are and what
to avoid. Despite this, RFCs are an area of active interest for me, so I wanted
to highlight this.

At work, we have begun to try [Architecture Decision Records][adr] to capture
some of our tribal knowledge. ADRs are documents that capture the context behind
major decisions made about an application's architecture. Things like "why was
framework X chosen?", "why is this service using basic authentication vs
OAuth2?", or "why are we using X test framework?" Along with the why, other
examples of topics covered by these documents are alternatives that were
considered or pressures placed on the team when the decision was made. The
documents are stored in the source repository with the application, and aim to
share the knowledge that would otherwise be unavailable unless the engineer that
made that decision is still on the team. I like ADRs so far, but it is still a
new process for our team, so we're evaluating it to see if it is a good fit.

RFCs and ADRs are mostly designed to serve the same purpose, but with RFCs the
emphasis is on seeking feedback and/or approval of your proposal. This emphasis
on collaboration benefits all engineers in the company by enhancing
accountability and cross-team knowledge sharing. I would relish the opportunity
to adopt an RFCs model for cross-team collaboration on best practices,
technology adoption, and major architecture changes!

For the time being, I'm going to continue to encourage ADR use in our greenfield
applications, advocate for designs to be documented on our internal wiki, and
ensure those designs are shared out to those within our team and on other teams
that may have some expertise on a given subject. I'm hoping these actions will
further develop our culture of documentation and collaboration. Long-term I hope
to introduce a process for RFCs.

To learn more about RFCs, I recommend [this article by Gergely Orosz][rfcgo].

[ea]: https://www.thoughtworks.com/radar/techniques/evolutionary-architecture
[rfc]:
  https://www.thoughtworks.com/radar/techniques/lightweight-approach-to-rfcs
[adr]:
  https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions.html
[rfcgo]:
  https://blog.pragmaticengineer.com/scaling-engineering-teams-via-writing-things-down-rfcs/

### Technique Trial - Hypothesis Driven Legacy Renovation

[Hypothesis-driven legacy renovation][hdlc] is described this way:

> We're often asked to refresh, update or remediate legacy systems that we
> didn't originally build. Sometimes, technical issues need our attention such
> as improving performance or reliability. One common approach to address these
> issues is to create "technical stories" using the same format as a user story
> but with a technical outcome rather than a business one. But these technical
> tasks are often difficult to estimate, take longer than anticipated or don't
> end up having the desired outcome. An alternative, more successful method is
> to apply **hypothesis-driven legacy renovation**. Rather than working toward a
> standard backlog, the team takes ownership of a measurable technical outcome
> and collectively establishes a set of hypotheses about the problem. They then
> conduct iterative, time-boxed experiments to verify or disprove each
> hypothesis in order of priority. The resulting workflow is optimized for
> reducing uncertainty rather than following a plan toward a predictable
> outcome.

At work our team is responsible for dozens of legacy applications, and we employ
this technique! Here is an example.

We have a legacy API that has served the company well and largely been stable
for years. It had recently been modified to accept events from Salesforce's
Outbound Message Queue and save them to a database. Subsequently, we found that
our Sales team would occasionally run mass updates in Salesforce, resulting in a
torrent of calls to the API that would bog it down for hours. Each time this
happened, we would sit down after remediation to discuss what went wrong and how
we might improve the system. Most of our initial changes did not result in
significant improvement, so we decided to turn the problem into a project for
someone to dig in to. The project owner did some deeper performance analysis,
wrote up their hypotheses about the cause of the problem, and we regrouped as a
team to discuss the proposals and decide what actions to take.

This approach to problem-solving and "legacy renovation" is a great
team-building technique! It also gave the individual leading the project a
chance to own something important to the team, drive the discussion and perform
the experiments. Overall, I recommend this approach!

[hdlc]:
  https://www.thoughtworks.com/radar/techniques/hypothesis-driven-legacy-renovation

### Other Interesting Trial Blips

- **tool trial - [SWR]** - SWR is a library for making http requests from a
  client side web application and has built-in support for the "Stale While
  Revalidate" caching strategy. I've been away from React for a bit, but I want
  to keep the knowledge of this tool fresh for the next time I dig in.

- **tool trial - [ESBuild]** - The ESBuild Javascript build tool keeps popping
  up on my radar. It seems to be a Webpack/Parcel replacement that improves
  compilation performance. Certainly worth a look the next time you go to add a
  Javascript compiler to your build toolchain, especially if you don't need some
  of the more advanced features these other tools provide.

- **technique trial - [ethical-explorer][ee]** - Ethical explorer aims to
  encourage teams to think about the ethical implications of the systems they
  build. This kind of introspection would make a great addition to a toolbox of
  team retrospective prompts.

- **technique trial - [distroless-docker-images][ddi]** - The idea of building a
  Docker image with the bare minimum underlying dependencies is great! Looking
  forward to trying this out.

[swr]: https://www.thoughtworks.com/radar/languages-and-frameworks/swr
[esbuild]: https://www.thoughtworks.com/radar/tools/esbuild
[ee]: https://www.thoughtworks.com/radar/techniques/ethical-explorer
[ddi]: https://www.thoughtworks.com/radar/techniques/distroless-docker-images

## Assessment Recommendation Highlights

> Worth exploring with the goal of understanding how it will affect your
> enterprise.

The assessment recommendations that stood out to me to highlight were either
things new to me that I am aware of and already excited about, or things I'm
actively interested in.

- **technique assessment - [privacy focused web analytics][pfwa]** - This is a
  trend that is emerging from the wake of GDPR and the corresponding surge in
  obtrusive cookie warnings and opt-in requests. Privacy-focused analytics
  instead says "what if instead we strive to anonymize analytics for a better
  user experience?" There are client-side solutions available like the
  [Plausible][plausible] service mentioned in the blip, but also competitor
  [Fathom][fathom]. For my site, I'm using [Netlify's server-side
  analytics][na], which is rad because it doesn't require any client-side
  tracking - everything is pulled from server logs. I don't know how robust a
  solution this is, though, because without the client tracking you probably
  can't do more advanced analytics. Still worth exploring.

- **tool assessment - [Buildah and Podman][bap]** - These tools are the Redhat
  tooling for building container images and running containers, respectively.
  I've known about their existence for a while, but have continued to use Docker
  for these needs. Docker has been working well and I haven't felt the need to
  look elsewhere, but I wonder why people are adopting these tools. Am I missing
  out?

- **tool assessment - [GitHub Actions][ga]** - I explored GitHub Actions when it
  first went public, but ended up getting distracted and never returned to it.
  Recently I was building some boilerplate for a Typescript library I was
  planning to build, and found a [nice template][nt] for a GitHub Actions
  Typescript build pipeline within the [tsdx] repository. Using this template
  for my build pipeline made me realize that I wouldn't ever need to look
  outside GitHub for my CI needs anymore. This tool is a huge quality of life
  boost, and combined with the new [Github Packages][gp] feature, has me in awe
  of the features Github is bringing to bear of late. If you haven't checked out
  Github Actions lately, you definitely should!

- **platform assessment - [Kafka API without Kafka][kawk]** - As part of an
  ongoing effort to familiarize myself with Kafka, this blip stood out to me.
  I've never used Kafka, but I read up it occasionally to develop a mental model
  of where it would be a good architectural fit (beyond simply thinking "Event
  driven == Kafka").

- **framework assessment - [React Hook Form][rhf]** - This suggestion I want to
  keep an eye on, for when I get back into React development.

[pfwa]:
  https://www.thoughtworks.com/radar/techniques/privacy-focused-web-analytics
[bap]: https://www.thoughtworks.com/radar/tools/buildah-and-podman
[ga]: https://www.thoughtworks.com/radar/tools/github-actions
[kawk]: https://www.thoughtworks.com/radar/platforms/kafka-api-without-kafka
[rhf]:
  https://www.thoughtworks.com/radar/languages-and-frameworks/react-hook-form
[plausible]: https://plausible.io/
[fathom]: https://usefathom.com
[na]: https://www.netlify.com/products/analytics/
[nt]: https://github.com/formium/tsdx/tree/master/templates/basic
[tsdx]: https://tsdx.io
[gp]: https://github.com/features/packages

## Hold Recommendation Highlights

> Proceed with caution.

There were two main hold recommendations that stood out to me that I want to
highlight, but a few additional ones that surprised me or felt were noteworthy.

### Hold This Technique - Peer Review == Pull Request

[This anti-pattern][prpr] hits particularly close to home for me:

> Some organizations seem to think **peer review equals pull request**; they've
> taken the view that the only way to achieve a peer review of code is via a
> pull request. We've seen this approach create significant team bottlenecks as
> well as significantly degrade the quality of feedback as overloaded reviewers
> begin to simply reject requests. Although the argument could be made that this
> is one way to demonstrate code review "regulatory compliance" one of our
> clients was told this was invalid since there was no evidence the code was
> actually read by anyone prior to acceptance. Pull requests are only one way to
> manage the code review workflow; we urge people to consider other approaches,
> especially where there is a need to coach and pass on feedback carefully.

I have been a long-time advocate of adapting code review to the work being done.
Many times a pull request is fine, but software engineers should familiarize
themselves (and practice!) other forms of peer review when appropriate. [Pair
programming][pairing], [mob programming][mp], and [RFCs][rfcgo] are other forms
of peer review that should be considered depending on the scope of the review
that is desired.

It is also critical for junior engineers to have active mentorship. It is not
enough for them to rely solely on pull requests for feedback and learning.
Everyone learns differently, and teams need to consider that the way they
normally provide each other feedback may not work for an engineer that is just
getting started in their career.

So branch out and try a new form of peer review! You might be surprised to find
that it is a much more rewarding experience than what you are used to.

[prpr]:
  https://www.thoughtworks.com/radar/techniques/peer-review-equals-pull-request
[pairing]: https://martinfowler.com/articles/on-pair-programming.html
[mp]: https://mobprogramming.org/mob-programming-basics/
[rfcgo]:
  https://blog.pragmaticengineer.com/scaling-engineering-teams-via-writing-things-down-rfcs/

### Hold this Technique - GitOps

I was surprised to see [GitOps][gitops] on the hold list, but their explanation
makes sense:

> We suggest approaching GitOps with a degree of care, especially with regard to
> branching strategies. GitOps can be seen as a way of implementing
> [infrastructure as code][iac] that involves continuously synchronizing and
> applying infrastructure code from [Git][git] into various environments. When
> used with a "branch per environment" infrastructure, changes are promoted from
> one environment to the next by merging code. While treating code as the single
> source of truth is clearly a sound approach, we're seeing branch per
> environment lead to environmental drift and eventually environment-specific
> configs as code merges become problematic or even stop entirely. This is very
> similar to what we've seen in the past with [long-lived branches with
> GitFlow][llbgf].

At work, we use Git to store our infrastructure as [Ansible][ansible] playbooks,
and the different environments are represented as separate inventories you can
apply a single deployment playbook to. Our development workflow involves
short-lived feature branches, but all environments are deployed from the main
branch. This helps us avoid the drift problem described above and makes us think
carefully about when and where we have our environments differ from one another.
It is also the "painful path" to allow environments to diverge using this
model... a good thing!

[gitops]: https://www.thoughtworks.com/radar/techniques/gitops
[iac]: https://www.thoughtworks.com/radar/techniques/infrastructure-as-code
[git]: https://www.thoughtworks.com/radar/tools/git
[llbgf]:
  https://www.thoughtworks.com/radar/techniques/long-lived-branches-with-gitflow
[ansible]: https://www.ansible.com

### Other Noteworthy Hold Recommendations

- **hold this technique - [ticket driven platform operating models][tdpom]** -
  When I saw this I agreed wholeheartedly. We should be looking to reduce gating
  and friction!

- **hold using this tool - [AWS CodePipeline][acp]** - This surprised me! I
  don't often see advice to _not_ use an AWS service, so I wanted to bookmark
  this as a data point for consideration should CodePipeline ever come up in
  conversation. By then, though, CodePipeline may have changed. AWS seems to
  iterate heavily on their services.

- **hold this technique - [separate code and pipeline ownership][scpo]** - This
  is what I often hear being called "DevOps". If anything, a DevOps team can
  help set up CI, but then advocate for teams to learn the tooling, processes,
  and administration of these pipelines, leading to the DevOps team
  relinquishing it to the consumers. At my company, we have adopted a process
  where each team owns the operation and maintenance of their CI build plans,
  deployments, and build agents. We wish that a "platform team" would own the
  operation of the server itself (or a cloud service), but for now we're also
  stuck maintaining that portion. Hopefully we'll be migrating that to a cloud
  service soon.

[tdpom]:
  https://www.thoughtworks.com/radar/techniques/ticket-driven-platform-operating-models
[acp]: https://www.thoughtworks.com/radar/tools/aws-codepipeline
[scpo]:
  https://www.thoughtworks.com/radar/techniques/separate-code-and-pipeline-ownership

## Conclusion

The ThoughtWorks Technology Radar is a great resource for learning about the
experiences of others in our industry. It is one of the many ways that I keep
up, so that I can take those learnings back to my company and incorporate them
where it makes sense. If you find these highlights interesting too, you can read
the entire radar [at the website][tr], and signup there to be notified when new
versions are available.

In the future I plan to write about other ways that I keep up with news,
industry topics, and educational resources. If you'd be interested in that, stay
tuned.

[tr]: https://www.thoughtworks.com/radar
