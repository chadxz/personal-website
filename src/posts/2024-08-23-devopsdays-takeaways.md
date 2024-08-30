---
date: 2024-08-23T13:00:00
title: Takeaways from DevOpsDays
description: >
  My take on the highlights from DevOpsDays Birmingham, AL that occurred August
  19-21, 2024.
permalink: dod-recap-2024/
tags:
  - devops
  - agile
  - devopsdays
---

This year was my third year to attend [DevOpsDays Birmingham, AL][dod]. The
first year I attended, I was invited by a friend that was acquainted with one of
the organizers. I was invited to come to the speakers' dinner despite not giving
a talk, which was a great experience for me. Conversations at this dinner helped
me realize the people giving talks were primarily _speaking from their lived
experience_ with the tools, techniques, and technologies they were sharing with
others. I knew I could do the same, so it helped me build the courage to submit
a talk the following year.

[dod]: https://devopsdays.org/events/2024-birmingham-al/welcome/

In 2022, I [gave my first-ever public conference talk](/platform/). My
confidence grew further from that experience, and this year my conference talk
was selected as the day two keynote! I'll share more about my talk another day,
as in this post I want to highlight what I learned from others, how I felt
walking away from the conference, and my thinking about future conferences.

## Format Changes from Previous Years

In previous years, the conference was two days of talks. This year, the
organizers decided to make a couple of changes to the format, all of which I
felt were great choices and enhanced the quality of the conference:

1. **A day of workshops was added** at the beginning of the conference, making
   the conference now three days instead of two.
2. **"Open Spaces" topics were proposed on stage** and **voting happened as
   people were heading into the hall**, so participation in this process was a
   lot better.

## Day 1 - Workshops

### Hands-on Hashicorp Vault

<img src="/images/dod-recap-2024/vault.png" alt="Hashicorp Vault" class="float-right ml-4 mb-4 w-1/4">

The first workshop of the conference was a set of hands-on activities setting up
[Hashicorp Vault](https://www.vaultproject.io/) for the first time, adding some
secrets to it, setting up user management, and applying permissions to secrets.
I enjoyed this workshop because I had been wanting to get some hands-on
experience with Vault for a while, but hadn't had a chance until now. The
workshop was administered as an [Instruqt](https://instruqt.com/) course, which
provided a pre-configured web-based environment with a built-in editor and
command line for running vault and various cli utilities as well as viewing the
admin web interface. The Hashicorp developer advocate running the workshop,
[Michael Kosir](https://www.linkedin.com/in/michael-kosir/), explained the
various concepts well and answered all my myriad questions. I learned from this
experience that Vault is really best suited for organizations that are running
workloads in multiple cloud providers, as it provides a layer of abstraction
between your cloud provider that gives you a single place to manage access
control, rotation policies, and more. For me at a startup that is only working
in Google Cloud, I think it is best for us to stick to Google Cloud Secrets
Manager and, when providing access to Kubernetes workloads, some sort of
operator for bridging between the Kubernetes world of workload identity (i.e.
service accounts and namespaces) and the secret, such as
[External Secrets Operator](https://external-secrets.io/latest/).

### Trufflehog

<img src="/images/dod-recap-2024/trufflehog.png" alt="Trufflehog" class="float-right ml-4 mb-4 w-1/4">

At lunch, I met [Dwayne McDaniel](https://www.linkedin.com/in/dwaynemcdaniel/),
Developer Advocate at GitGuardian and a fellow speaker at the conference. During
a conversation about secrets management, he shared a CLI utility called
[trufflehog](https://github.com/trufflesecurity/trufflehog) that performs
secrets scanning on a Git repository. My current company Smartrr uses
[gitleaks](https://github.com/gitleaks/gitleaks), but supposedly trufflehog is
better so it sounds like it's worth a look!

### PCM and the Perils of Multitasking

There were two workshops I really enjoyed in the afternoon: one by
[Aleksandra Lemańska](https://www.linkedin.com/in/aleksandralemanska/) about
[Process Communication Model (PCM)](https://processcommunicationmodel.com/) and
an agile workshop by [Steve Hallman](https://www.linkedin.com/in/stevehallman/).

In Aleksandra's workshop, she gave us a taste of part of the PCM, sharing how
everyone has a "dominant" communication style and by learning the telltales, we
can employ an appropriate method of communication to successfully be understood
by them. It's an intriguing proposition and one I'd like to look into more.

Steve's workshop had us participate in a game called "[How long does it take to
write a name?][game]", originally developed by Henrik Kniberg. It was an
eye-opening first-hand experience illustrating how inefficient multitasking is.
He then went on to explain that even better than single-piece flow is applying
multiple people to a single piece of work, commonly known in software
engineering as "Mob Programming". Steve recommended the work of Woody Zuill for
further education on the topic.
[Here's a video](https://www.youtube.com/watch?v=SHOVVnRB4h0) from Goto
Conference 2017 where Woody explains his approach, and he [wrote a
book][software teaming] on the topic as well!

[game]: https://www.crisp.se/gratis-material-och-guider/multitasking-name-game
[software teaming]:
  https://www.amazon.com/Software-Teaming-Programming-Whole-Team-Approach/dp/B0BTBVPD9J/ref=tmm_hrd_swatch_0?_encoding=UTF8&qid=&sr=

Another great resource Steve shared with me is his [Software Practices
Timeline][practices timeline], detailing various practices developed within the
software industry over the years to improve effectiveness. He described how
organizations can trace their maturity through the timeline, finding which
pieces they may still be able to employ to "unlock" new efficiencies and
capabilities. I don't want to link directly to it here, as I think Steve is
still developing it, but he's looking for folks to beta test it with him so
reach out to him if this sounds useful to you!

Lastly, Steve spoke about [Little's Law][law] and how it models the behavior of
queues, which is very relevant to a software engineer's daily work. Check it out
to get some theory behind the value of low work-in-progress (WIP)!

[law]: https://www.scrum.org/resources/littles-law-professional-scrum-kanban
[practices timeline]:
  https://www.linkedin.com/posts/stevehallman_devopsdays-activity-7232442238067245056-Lzh0

## Day 2 & Day 3 - Talks and Hallway Conversations

There were many talks at the conference, both on the schedule and in open
spaces, which were ad-hoc sessions about topics the attendees wanted to discuss.
I thought all of the talks were well done. I had a couple of favorites of the
conference: "A successful platform is an opinionated platform" by
[Ben Goodman](https://www.linkedin.com/in/ben-g-382141212/), Senior SRE at Rokt,
and [Steve's agile talk][steve agile talk] about improving your team's
efficiency by pulling techniques from the "free toolbox" instead of adding
headcount.

[steve agile talk]:
  https://www.linkedin.com/posts/stevehallman_devopsdays-activity-7232025050890014720-Q-l4

I also had some great hallway conversations.

<img src="/images/dod-recap-2024/devclarity.png" alt="DevClarity" class="float-left mr-4 mb-2 w-1/4">

One was with [Will Blackburn](https://www.linkedin.com/in/willhblackburn/) and
[Peter Inge](https://www.linkedin.com/in/peter-inge-cfa-9001ab77/) of
[DevClarity](https://devclarity.ai/), a freshly minted startup focusing on
improving the effectiveness of engineering management. They launched their
product at DevOpsDays and were able to secure a pre-seed round of funding the
same day, too! I really resonated with their mission and the problems they are
looking to solve, as I feel them acutely in my work. I look forward to seeing
how their product progresses!

<img src="/images/dod-recap-2024/crystaldb.png" alt="CrystalDB" class="float-right ml-4 mb-2 w-1/4">

Another conversation was with [Johann Schleier-Smith](https://www.linkedin.com/in/jssmith/)
about the work he is doing to provide automated ops for PostgreSQL with the
startup he has founded called [CrystalDB](https://www.crystaldb.cloud/). I
shared the pains Smartrr has been having with performance and how having some
baked-in intelligence would help us a lot. He's got an extensive [blog
post][crystaldb blog post] detailing the opportunity they see for applying AI &
ML to operating PostgreSQL and are developing both open source and
subscription-based solutions for the PostgreSQL user community.

[crystaldb blog post]:
  https://www.crystaldb.cloud/blog/post/keeping-postgresql-in-the-lead-with-ai-for-systems

Lastly, I had a fun (but nerdy) conversation about architecture diagramming in
an open spaces conversation. I shared some tools I had been using lately for
sharing knowledge with others ([eraser.io](https://eraser.io/) and
[gamma.app](https://gamma.app/)) and the pains I have had with
[excalidraw](https://excalidraw.com/), and was recommended to give
[Miro](https://miro.com/) another try for architecture diagrams. I've been using
Miro for other things but not for architecture, so I'm looking forward to trying
it out the next time I need a diagram.

## Support Your Local DevOpsDays!

DevOpsDays is a not-for-profit organization that is run by volunteers and is
solely focused on bringing technologists together. Supporting your local
DevOpsDays helps build your local tech scene. This in turn encourages innovation
that you can take part in as an employee or co-founder, creates a community you
can source solid candidates from as colleagues or learn from, and provides you
opportunities to grow yourself by teaching, speaking and mentoring others. I
strongly recommend DevOpsDays and am thankful for the organizing committee of
DevOpsDays Birmingham, their sponsors, and my employer [Smartrr](https://smartrr.com) for sending me. 👏
