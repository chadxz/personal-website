---
date: 2021-03-28T02:00:00.00-05:00
title: Bootstrapping my Static Blog
description: >-
  Walking through the process of getting my personal blog off the ground.
permalink: bootstrap/
tags:
  - meta
  - 11ty
---

I have had many false-starts with blogging. Most of the time I start out
tinkering with [various][] [front-end][] [javascript][] [frameworks][], testing
[build tooling][], and trying to come up with fancy ideas prior to bootstrapping
the blogging pieces. As time went on I would tell myself I would eventually get around
to building the blogging portions of the site, but when push came to shove it never
became a priority. So my site would sit around with integrations setup to tools I
use (i.e. [Pinboard][], [Pocket][], [Last.fm][]), but without anything setup for
me to write.

[various]: https://github.com/chadxz/chadmcelligott.com
[front-end]: https://github.com/chadxz/personal-site-rewrite
[javascript]: https://github.com/chadxz/personal-site-react
[frameworks]: https://github.com/chadxz/personal-site-angular
[build tooling]: https://github.com/chadxz/personal-site-rewrite/tree/webpack
[pinboard]: https://pinboard.in/u:chadxz
[pocket]:
  https://getpocket.com/@236ddpUqTVUqXgf7a2Af5a8Af0gaT858f96o78Ubdouf56d254aoDr19z24Ql31f
[last.fm]: https://www.last.fm/user/chadxz

This time I am determined to take a different approach. While I do want to leave
the door open to customizing all aspects of the site, I am starting from the
beginning with blogging as the primary focus. I really want to break out of the
discomfort of blogging, and I know the only way to make that happen is to...
just do it. It'll get easier as I go, right?

In this post, I want to share my initial setup with you.

## Choosing 11ty as My Blogging Platform

I had already decided that I wanted to self-host and use a workflow driven by
flat files and static-site generation. I really like the git-based flat files
because they are simple, portable, and _mine_. I'm also really comfortable
working in Markdown and have tools (like [IntelliJ editors][] and [Marked.app][])
that have strong support for Markdown. I knew there were good free options for hosting
static sites and that more have emerged in recent times, so building this way would
be a low-overhead way to start blogging. The only decision left was to choose which
SSG to use.

[intellij editors]: https://www.jetbrains.com/help/idea/markdown.html
[marked.app]: https://marked2app.com

I narrowed my choices of blogging platform down to 3: [Zola][] (written in
Rust), [Hugo][] (written in Go), and [11ty][] (written in Node). There are
myriad others available as can be seen on [jamstack.org][], but these were the
ones that were already top-of-mind to me. Zola because I have recently been
learning Rust and it is a popular choice in that community; Hugo because I had
run across a Hugo template I liked recently ([hugo-coder][]); and 11ty because
it is known to be a "simple but powerful" SSG compared to the likes of
[Gatsby][] and [Next.js][].

[zola]: https://www.getzola.org
[hugo]: https://gohugo.io
[11ty]: https://www.11ty.dev
[hugo-coder]: https://github.com/luizdepra/hugo-coder/
[jamstack.org]: https://jamstack.org/generators/
[gatsby]: https://www.gatsbyjs.com
[next.js]: https://nextjs.org

I chose 11ty in the end because, even though I liked the hugo-coder template, I
felt like I would want to build up my own template from scratch. I also felt
like having a SSG that was installable by `npm install` along with all the other
dependencies I would want to use like [Prettier][], [Husky][], and
[lint-staged][], would be a really smooth experience. I was also really happy
that 11ty supported [Nunjucks][] templating as a first-class citizen. Nunjucks
is essentially a port of the [Jinja2][] templating language, which I'm very
familiar with from working so much with Ansible.

[prettier]: https://prettier.io
[husky]: https://typicode.github.io/husky/#/
[lint-staged]: https://github.com/okonet/lint-staged
[nunjucks]: https://mozilla.github.io/nunjucks/
[jinja2]: https://jinja.palletsprojects.com/en/2.11.x/
[ansible]: https://www.ansible.com

So after getting some boilerplate setup for 11ty
([this blog post](https://mtm.dev/eleventy) from
[@mtmdev\_](https://twitter.com/mtmdev_) was really helpful), the next step was
deciding where to deploy it.

## Deploying My Site to Netlify

I have always been a fan of platforms like [Heroku][] and [Github Pages][] that take
so much of the toil away from deploying applications. I have deployed web applications
to both, and have been very happy with them. BUT! You'd have to be living under a
rock to not see all the buzz about [Netlify][] these days, so I wanted to give it
a try to see for myself.

[heroku]: https://www.heroku.com
[github pages]: https://pages.github.com
[netlify]: https://www.netlify.com

The short story about Netlify is that the buzz and attention they get are fully
deserved. After publishing my application to a repository on Github, signing up
with Netlify took seconds. Walking through their on-boarding process is quick
and before I knew it my application was fully available at a random netlify url.
I could hardly believe how easy it was.

Netlify also offers [server-side analytics][] for $9/month, which I thought was a
good deal. Yes, [Google Analytics][] is free, but I wanted something that was
more privacy conscious. My runner-up was [Fathom][], but it was more expensive,
and I _really_ liked that server-side analytics don't require client-side
scripts to be effective.

[server-side analytics]: https://www.netlify.com/products/analytics/
[google analytics]: https://marketingplatform.google.com/about/analytics/
[fathom]: https://usefathom.com

So now that my application was up, a new concern arose: What domain did I want
to use?

## Grabbing a New Domain Name: chadxz.dev

My previous personal websites were all hosted under the domain name
`chadmcelligott.com`. While straightforward, this domain name is difficult for
most people to spell or remember, so I wanted to change it up and go for
something shorter and simpler.

To purchase the new domain name, I used [Namecheap]. In my experience they're a
good quality registrar. I have numerous domains I have purchased with them
throughout the years and have never had any issues. When I went to choose the
domain, I knew I wanted a `.dev` domain because I like that they are https only
and stands for "developer" (hey, that's me!). I chose `chadxz.dev` because
`chadxz` is [my Github username][], it was available and cheap, and it felt like
a good fit.

[namecheap]: https://www.namecheap.com
[my github username]: https://github.com/chadxz

After purchasing my domain, I moved the DNS over to [Netlify DNS][] service. Using
the Netlify DNS is free and is configurable if you want to set up additional records
besides the ones necessary to host your site. As a bonus, once your custom domain
is configured, Netlify automatically provisions a [SSL certificate][] for free.

[netlify dns]: https://docs.netlify.com/domains-https/netlify-dns/
[ssl certificate]: https://docs.netlify.com/domains-https/https-ssl/

So now that my application is up, what other functionality did I feel my site
needed to have a solid foundation?

## Establishing My Newsletter with buttondown.email

One aspect I have always appreciated about some blogs is the ability to follow
bloggers whose content I enjoy. I knew when setting up my blog that I wanted to
make it _super_ easy for people to follow my content if they wanted to. On this
front, I decided on two pieces to tackle this:

1. Ensure the blog has an RSS/Atom feed setup
2. Make it painless to receive new content via email

The RSS/Atom feed was super easy - 11ty has a [1st-class plugin][] for generating
Atom feeds, and the walk-through on their site shows how to build a basic template
for one.

[1st-class plugin]: https://www.11ty.dev/docs/plugins/rss/

Adding the ability to subscribe to my blog content via email was more work and
required vendor selection. I knew I wanted to find something free and easy,
because I was only getting started and knew my needs would not be complex. As it
turns out, earlier in the day I had subscribed to [Cassidy Williams][]' newsletter
"[rendezvous with cassidoo]", which uses [buttondown.email][]. Taking a look at their
site, they do everything I wanted and have a generous free tier (up to 1,000 subscribers
for free), so I decided to roll with them. My newsletter is now available at [https://buttondown.email/chadxz][],
and I'll be adding a small unobtrusive signup form to the bottom of my post template
in the future.

Now while setting up my newsletter, I realized I wanted it to be sent _by me_
and _from my new domain_. In order to make this work, I would need some way to
receive email at my domain.

[https://buttondown.email/chadxz]: https://buttondown.email/chadxz
[cassidy williams]: https://twitter.com/cassidoo
[rendezvous with cassidoo]: https://buttondown.email/cassidoo
[buttondown.email]: https://buttondown.email

## Receiving Email at My Custom Domain With ImprovMX

While doing some research into whether Netlify DNS supported sending and
receiving email, I ran across an official recommendation on a [Netlify
support thread] for using the service [ImprovMX][]. ImprovMX has a dead-simple
setup and allows setting up to 5 email addresses (including a wildcard) to
forward emails sent to your custom domain to the email address of your choice.
For free. If you want to send emails _from_ your custom domain, you have to
cough up some $$, but for now I'm going with their free tier.

[improvmx]: https://improvmx.com
[netlify support thread]:
  https://answers.netlify.com/t/support-guide-how-can-i-receive-emails-on-my-domain/178

## The Foundation has been Laid

So with all of that done, we have:

- A static, Markdown-based site on Github...
- That deploys automatically on push to the `main` branch...
- Behind a custom domain with https...
- With an RSS feed and an email newsletter...
- And a custom email address that can receive email on my new domain.

The site itself isn't much to look at yet, but with all of this preliminary work
done, design and extra features can be added. The most important thing is that
all the barriers to publishing are gone!

I'm looking forward to designing the site and writing more on a variety of
topics: other projects I have going on (like learning Rust), books and articles
I am reading, thoughts about challenges I face at work, and more.
